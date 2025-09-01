// Tab 切换
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  const currentTab = document.getElementById(tabName);
  currentTab.style.display = "block";
  evt.currentTarget.className += " active";

  //if(tabName === 'PDF') loadPDF(currentTab); // 传入当前 Tab 容器
}

function scrollToTop() {
  // scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// PDF.js 渲染
async function loadPDF(pdfContainer) {
  // 从 HTML data-pdf 属性获取 PDF 文件路径
  const url = pdfContainer.getAttribute('data-pdf');
  const pdf = await pdfjsLib.getDocument(url).promise;
  const viewer = pdfContainer.querySelector('#viewer');
  viewer.innerHTML = '';

  const containerWidth = viewer.clientWidth;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const unscaledViewport = page.getViewport({ scale: 1 });

    // 高画质：乘以设备像素比
    const scale = (containerWidth / unscaledViewport.width) * window.devicePixelRatio * 0.95;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');

    // 禁止右键和复制操作
    canvas.addEventListener('contextmenu', e => e.preventDefault());

    await page.render({ canvasContext: ctx, viewport }).promise;
    viewer.appendChild(canvas);
  }
}

// 禁止全局右键和快捷键
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey && ['s','p','u','S','P','U'].includes(e.key)) e.preventDefault();
});
document.addEventListener("DOMContentLoaded", () => {
  const defaultTab = document.querySelector(".tablinks.active");
  const defaultTabContainer = document.getElementById('PDF');

  // 显示默认 tab
  defaultTabContainer.style.display = "block";

  // 调用 PDF 渲染
  loadPDF(defaultTabContainer);
});



