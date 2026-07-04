import './styles.css';

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const heroPanels = {
  website: {
    summary: 'Launch with a premium web presence that makes every first impression feel polished and fast.',
    highlights: [
      { label: 'Landing page experience', text: 'Built for clarity, speed, and lead capture.' },
      { label: 'Design system', text: 'Consistent visuals, typography, and interaction for every page.' },
      { label: 'Agile delivery', text: 'A fast, milestone-driven launch plan that keeps your project on track.' }
    ]
  },
  automation: {
    summary: 'Reduce manual follow-up and internal handoffs with automated client workflows that keep everything moving.',
    highlights: [
      { label: 'Lead follow-up', text: 'Automatic email, SMS, or task reminders.' },
      { label: 'CRM sync', text: 'Data flows into tools without extra steps.' },
      { label: 'Client intake', text: 'Structured form journeys that direct prospects instantly.' }
    ]
  },
  seo: {
    summary: 'Appear in the right feeds with search-ready pages, strong content structure, and a fast technical foundation.',
    highlights: [
      { label: 'Site structure', text: 'Content built for users and search crawlers.' },
      { label: 'Page speed', text: 'Optimized assets, minimal scripts, and priority loading.' },
      { label: 'Visibility', text: 'SEO fundamentals baked into every page.' }
    ]
  }
};

function setHeroPanel(key) {
  const panel = heroPanels[key];

  if (!panel) return;
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.panel === key);
  });

  const summaryText = document.querySelector('.summary-text');
  const highlightsGrid = document.querySelector('.summary-highlights');
  const visualFrame = document.querySelector('.visual-frame');

  if (summaryText) summaryText.textContent = panel.summary;
  if (visualFrame) {
    visualFrame.classList.remove('panel-website', 'panel-automation', 'panel-seo');
    visualFrame.classList.add(`panel-${key}`);
  }

  if (highlightsGrid) {
    highlightsGrid.innerHTML = panel.highlights
      .map(
        (item) => `
          <div class="highlight-card">
            <strong>${item.label}</strong>
            <p>${item.text}</p>
          </div>
        `
      )
      .join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      setHeroPanel(tab.dataset.panel);
    });
  });

  setHeroPanel('website');
});
