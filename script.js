(function () {
  var gallery = document.getElementById('heroGallery');
  if (gallery) {
    var track = gallery.querySelector('.gallery-track');
    var slides = gallery.querySelectorAll('.gallery-slide');
    var dots = gallery.querySelectorAll('.gallery-dot');
    var prevBtn = gallery.querySelector('.gallery-prev');
    var nextBtn = gallery.querySelector('.gallery-next');
    var current = 0;
    var timer = null;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + current * 33.3333 + '%)';
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function start() {
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(next, 4000);
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
      }
    }

    prevBtn.addEventListener('click', function () {
      prev();
      start();
    });
    nextBtn.addEventListener('click', function () {
      next();
      start();
    });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(Number(dot.dataset.slide));
        start();
      });
    });
    gallery.addEventListener('mouseenter', stop);
    gallery.addEventListener('mouseleave', start);
    gallery.addEventListener('focusin', stop);
    gallery.addEventListener('focusout', start);
    start();
  }

  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var painItems = document.querySelectorAll('.pain-item');
  painItems.forEach(function (item) {
    var toggle = item.querySelector('.pain-toggle');
    toggle.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');
      painItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.pain-toggle').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  var modal = document.getElementById('caseModal');
  var closeBtn = document.getElementById('caseModalClose');
  var modalTag = document.getElementById('caseModalTag');
  var modalTitle = document.getElementById('caseModalTitle');
  var modalSummary = document.getElementById('caseModalSummary');
  var modalDetail = document.getElementById('caseModalDetail');
  var modalLink = document.getElementById('caseModalLink');

  var caseData = {
    1: {
      tag: '案例 01',
      title: '南京奥体实验幼儿园 · 豆包搭丝瓜架',
      summary: '5岁幼儿让豆包AI提供“搭丝瓜架方案”，再由自己动手搭建。',
      detail: 'AI不是直接告诉孩子答案，而是提供方案供幼儿选择和实践；孩子是实践者，AI是启发者。',
      link: 'https://m.yzwb.net/wap/news/3840684.html'
    },
    2: {
      tag: '案例 02',
      title: '上海康弘幼儿园 · 康康狮',
      summary: '智能学伴“康康狮”陪幼儿做信息检索、知识图谱推理。',
      detail: 'AI作为幼儿的智能学伴，把检索和推理变成可陪伴的学习过程，帮助幼儿在探索中建立知识联系。',
      link: 'https://www.pudong.gov.cn/pudong-interaction-front/edu/school/detail?schoolId=e9734f538a804a42b0abc46e0b243a98'
    },
    3: {
      tag: '案例 03',
      title: '青岛滨海新村幼儿园 · 茂腔数字人',
      summary: '用AI构建非遗“茂腔数字人”，带幼儿学戏曲身段。',
      detail: '传统文化通过AI数字人变得可看、可听、可模仿，弥补幼儿实际经验和科学常识的不足。',
      link: 'https://news.iqilu.com/yangmei/20230403/5395233.shtml'
    }
  };

  function openModal(key) {
    var data = caseData[key];
    if (!data) {
      return;
    }
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalSummary.textContent = data.summary;
    modalDetail.textContent = data.detail;
    modalLink.href = data.link;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.case-card').forEach(function (card) {
    function activateCase() {
      openModal(card.dataset.case);
    }
    card.addEventListener('click', activateCase);
    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateCase();
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (other) {
        other.classList.remove('is-active');
        other.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(function (panel) {
        panel.hidden = true;
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      var panel = document.getElementById('panel-' + btn.dataset.tab);
      if (panel) {
        panel.hidden = false;
      }
    });
  });

  document.querySelectorAll('.need-card').forEach(function (card) {
    var toggle = card.querySelector('.need-toggle');
    toggle.addEventListener('click', function () {
      var open = card.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open
        ? '收起要点<svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg>'
        : '展开要点<svg class="icon" aria-hidden="true"><use href="#i-chevron-down"/></svg>';
    });
  });

  var copyBtn = document.getElementById('copyWechat');
  if (copyBtn) {
    copyBtn.addEventListener('click', async function () {
      var ok = await copyText('Diste-1');
      copyBtn.innerHTML = ok
        ? '已复制<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>'
        : '请手动复制<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>';
      window.setTimeout(function () {
        copyBtn.innerHTML = '复制<svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg>';
      }, 1600);
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // fall through to legacy copy
      }
    }
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (error) {
      ok = false;
    }
    textarea.remove();
    return ok;
  }
})();
