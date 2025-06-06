// Story Card Component
const template = document.createElement('template');
template.innerHTML = `
    <section class="featured-story">
        <a href="" class="story-card" style="background-image: url('');">
            <div class="story-meta">
                <span class="story-date"></span>
                <span class="story-read-time"></span>
                <span class="story-views"></span>
            </div>
            <div class="story-content">
                <h3></h3>
                <p></p>
            </div>
        </a>
    </section>
`;

class StoryCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['link', 'image', 'date', 'read-time', 'title', 'excerpt', 'views'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const link = this.getAttribute('link') || '#';
        const image = this.getAttribute('image') || '';
        const date = this.getAttribute('date') || '';
        const readTime = this.getAttribute('read-time') || '';
        const title = this.getAttribute('title') || '';
        const excerpt = this.getAttribute('excerpt') || '';
        const views = this.getAttribute('views') || '0';

        const content = template.content.cloneNode(true);
        
        // Set content
        const card = content.querySelector('.story-card');
        card.href = link;
        card.style.backgroundImage = `url('${image}')`;
        
        content.querySelector('.story-date').textContent = date;
        content.querySelector('.story-read-time').textContent = readTime;
        content.querySelector('.story-views').innerHTML = `<i class="fas fa-eye"></i> ${views} views`;
        content.querySelector('h3').textContent = title;
        content.querySelector('p').textContent = excerpt;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                margin-bottom: 1.5rem;
            }

            .featured-story {
                padding: 0 var(--gutter);
            }

            .story-card {
                background: var(--background-light);
                border-radius: var(--border-radius);
                overflow: hidden;
                box-shadow: var(--shadow-md);
                transition: var(--transition);
                position: relative;
                height: var(--card-height);
                margin-bottom: 2rem;
                text-decoration: none;
                display: block;
                background-size: cover;
                background-position: center;
            }

            .story-card:hover {
                transform: translateY(-4px);
                box-shadow: var(--shadow-lg);
            }

            .story-content {
                padding: 2rem;
                background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent);
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                color: white;
                transition: var(--transition);
            }

            .story-card:hover .story-content {
                background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6), transparent);
            }

            .story-content h3 {
                font-size: 1.75rem;
                font-weight: 600;
                margin-bottom: 1rem;
                line-height: 1.3;
                transition: var(--transition);
            }

            .story-card:hover .story-content h3 {
                transform: translateY(-2px);
            }

            .story-meta {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                display: flex;
                align-items: center;
                z-index: 2;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                background: rgba(255, 255, 255, 0.1);
                padding: 0.5rem 1rem;
                border-radius: 100px;
                transition: var(--transition);
            }

            .story-card:hover .story-meta {
                background: rgba(255, 255, 255, 0.15);
            }

            .story-date, .story-read-time, .story-views {
                color: rgba(255, 255, 255, 0.9);
                font-size: 0.8rem;
                font-weight: 500;
                letter-spacing: 0.3px;
                display: flex;
                align-items: center;
            }

            .story-date::after,
            .story-read-time::after {
                content: "•";
                margin: 0 0.75rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .story-views i {
                margin-right: 0.4rem;
            }

            @media (max-width: 768px) {
                .story-card {
                    height: 400px;
                }
                
                .story-content h3 {
                    font-size: 1.2rem;
                }
                
                .story-content p {
                    font-size: 0.85rem;
                }

                .story-meta {
                    top: 1rem;
                    right: 1rem;
                    padding: 0.4rem 0.8rem;
                }
                
                .story-date, .story-read-time, .story-views {
                    font-size: 0.75rem;
                }

                .story-date::after,
                .story-read-time::after {
                    margin: 0 0.5rem;
                }
            }
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(content);
    }
}

customElements.define('story-card', StoryCard); 