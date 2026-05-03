'use client'

import { useState } from 'react'

const products = {
  'blood-sugar': [
    { name: 'CelluCare', desc: 'Premium blood sugar support with clinically researched ingredients.', rating: '★★★★★ (2,847 reviews)', img: 'https://cellucare.com/assets/img/product-image.png', link: 'https://1c10fz3cutbu2w5ysgnjq9y147.hop.clickbank.net', badge: 'Top Rated' },
    { name: 'Gluco6', desc: 'Advanced formula with berberine, chromium & cinnamon.', rating: '★★★★★ (1,456 reviews)', img: 'https://gluco6.com/assets/img/product-image.png', link: 'https://2d58843dvymn1o8b-fidbo9ua9.hop.clickbank.net' },
    { name: 'GlucoBerry', desc: 'Unique berry-based formula for healthy blood sugar.', rating: '★★★★★ (1,203 reviews)', img: 'https://glucoberry.com/assets/img/product-image.png', link: 'https://586015x6xrgk8xa2yqj9obvf2c.hop.clickbank.net' },
    { name: 'Gluco Extend', desc: 'Extended-release formula for all-day glucose management.', rating: '★★★★☆ (892 reviews)', img: 'https://glucoextend.com/assets/img/product-image.png', link: 'https://477c958zonmnfw75tmjgs5-v15.hop.clickbank.net' },
    { name: 'GlucoNite', desc: 'Night-time blood sugar support formula.', rating: '★★★★☆ (678 reviews)', img: 'https://gluconite.com/assets/img/product-image.png', link: 'https://0538408a-0dx5q0bved8x87757.hop.clickbank.net' },
    { name: 'GlucoTonic', desc: 'Energizing blood sugar support with B-vitamins.', rating: '★★★★☆ (534 reviews)', img: 'https://glucotonic.com/assets/img/product-image.png', link: 'https://ca7d7735vqiy2xcdvpel-b0gmh.hop.clickbank.net' },
    { name: 'GlucoTrust', desc: 'Complete blood sugar defense formula.', rating: '★★★★★ (1,789 reviews)', img: 'https://glucotrust.com/assets/img/product-image.png', link: 'https://a6c39y51tzex1z192gxm13uhee.hop.clickbank.net' },
    { name: 'Sugar Defender', desc: 'Powerful blood sugar support formula.', rating: '★★★★★ (987 reviews)', img: 'https://sugardefender.com/assets/img/product-image.png', link: 'https://0a6faw69m0bs4t9c52cqscuob6.hop.clickbank.net' },
  ],
  'joint': [
    { name: 'Nu Nerve', desc: 'Advanced nerve support formula with premium ingredients.', rating: '★★★★★ (2,156 reviews)', img: 'https://nunerve.com/assets/images/1-desktop.png', link: 'https://5f4a3xv5-z9p2o198eum415ocs.hop.clickbank.net', badge: 'Top Rated' },
    { name: 'Nerve Armor', desc: 'Complete nerve defense formula with B-vitamins.', rating: '★★★★★ (1,789 reviews)', img: 'https://nervearmor.com/assets/images/1-desktop.png', link: 'https://4f09ev8cmv8y0y5mpm97ojr86g.hop.clickbank.net' },
    { name: 'JointVive', desc: 'Premium joint health with glucosamine & MSM.', rating: '★★★★★ (3,421 reviews)', img: 'https://jointvive.com/assets/images/1-desktop.png', link: 'https://580dc87-ty9qdl8cwcyp2cz9df.hop.clickbank.net' },
    { name: 'Joint Restore Gummies', desc: 'Delicious gummies with collagen.', rating: '★★★★★ (1,567 reviews)', img: 'https://jointrestoregummies.com/assets/images/1-desktop.png', link: 'https://9876ew1-mz8lfl63v90h21ws8n.hop.clickbank.net' },
    { name: 'Joint N-11', desc: 'Comprehensive joint support with 11 ingredients.', rating: '★★★★☆ (987 reviews)', img: 'https://jointn11.com/assets/images/1-desktop.png', link: 'https://f59fb-47wzaw8qbez4-g-ydv8p.hop.clickbank.net' },
    { name: 'Joint Genesis', desc: 'Genesis-level joint support.', rating: '★★★★★ (2,341 reviews)', img: 'https://jointgenesis.com/assets/images/1-desktop.png', link: 'https://9ec9f1z2mxdublc5p3tkrb0u04.hop.clickbank.net' },
    { name: 'Balmorex Pro', desc: 'Professional-grade joint balm.', rating: '★★★★☆ (654 reviews)', img: 'https://balmorexpro.com/assets/images/1-desktop.png', link: 'https://4f174vz0zoal6l52h9uh427xca.hop.clickbank.net' },
    { name: 'Arctic Blast', desc: 'Fast-acting topical pain relief.', rating: '★★★★★ (2,891 reviews)', img: 'https://arcticblast.com/assets/images/1-desktop.png', link: 'https://59df3-2-rslwcr163329q42u32.hop.clickbank.net' },
  ],
  'weight-loss': [
    { name: 'Mitolyn', desc: 'Advanced mitochondrial support for metabolism.', rating: '★★★★★ (4,102 reviews)', img: 'https://mitolyn.com/assets/images/6-desktop.png', link: 'https://d3d536z1yngq0pc9ls2f1dak93.hop.clickbank.net', badge: 'Top Rated' },
    { name: 'HepatoBurn', desc: 'Liver support for fat metabolism.', rating: '★★★★★ (2,156 reviews)', img: 'https://hepatoburn.com/assets/images/1-desktop.png', link: 'https://8d691x6cutgwbxf6qfdrz7zhvz.hop.clickbank.net' },
    { name: 'Java Burn', desc: 'Metabolism-boosting coffee additive.', rating: '★★★★★ (3,891 reviews)', img: 'https://javaburn.com/assets/images/1-desktop.png', link: 'https://cf04a602tpaq1y0hdih37l1u9g.hop.clickbank.net' },
    { name: 'Nagano Tonic', desc: 'Japanese-inspired fat-burning tonic.', rating: '★★★★★ (1,789 reviews)', img: 'https://naganotonic.com/assets/images/1-desktop.png', link: 'https://f3bcc72cqomofl75pn1ay15k0m.hop.clickbank.net' },
    { name: 'KeySlim', desc: 'Slimming complex for weight management.', rating: '★★★★☆ (1,234 reviews)', img: 'https://keyslim.com/assets/images/1-desktop.png', link: 'https://0764f0wdnqfp1v78uoygueeo6e.hop.clickbank.net' },
    { name: 'LeanBiome', desc: 'Probiotic formula for metabolic support.', rating: '★★★★★ (2,341 reviews)', img: 'https://leanbiome.com/assets/images/1-desktop.png', link: 'https://510c5x-bnvaydzecfzswn8-704.hop.clickbank.net' },
    { name: 'Lean Bliss', desc: 'Mood-supporting weight loss formula.', rating: '★★★★☆ (987 reviews)', img: 'https://leanbliss.com/assets/images/1-desktop.png', link: 'https://c08a1v65urkv5z2yyzf40r4p59.hop.clickbank.net' },
    { name: 'Liv Pure', desc: 'Liver detox and weight loss support.', rating: '★★★★★ (2,567 reviews)', img: 'https://livpure.com/assets/images/1-desktop.png', link: 'https://1486288dxwiq3r5bxf2h2cctao.hop.clickbank.net' },
    { name: 'Okinawa Flat Belly Tonic', desc: 'Traditional Japanese metabolism tonic.', rating: '★★★★★ (3,456 reviews)', img: 'https://okinawaflatbellytonic.com/assets/images/1-desktop.png', link: 'https://d3996360ypfy4t17qkq9ybdt4n.hop.clickbank.net' },
  ],
  'memory': [
    { name: 'CogniCare Pro', desc: 'Advanced cognitive support with nootropics.', rating: '★★★★★ (2,934 reviews)', img: 'https://cognicarepro.com/assets/images/1-desktop.png', link: 'https://2dce661azskzfu56z7t4n9-99f.hop.clickbank.net', badge: 'Top Rated' },
    { name: 'CogniSurge', desc: 'Fast-acting nootropic for mental energy.', rating: '★★★★★ (1,678 reviews)', img: 'https://cognisurge.com/assets/images/1-desktop.png', link: 'https://b862f-02mthx6kf2yfsc4pscir.hop.clickbank.net' },
    { name: 'Java Brain', desc: 'Brain-boosting coffee blend.', rating: '★★★★★ (1,456 reviews)', img: 'https://javabrain.com/assets/images/1-desktop.png', link: 'https://52c09025to9nfp6ekhpa6wlgcw.hop.clickbank.net' },
    { name: 'NeuroPrime', desc: 'Comprehensive nootropic for brain health.', rating: '★★★★★ (987 reviews)', img: 'https://neuroprime.com/assets/images/1-desktop.png', link: 'https://5405ewu3szbz3q49lr-hugylnq.hop.clickbank.net' },
    { name: 'Neuro Surge', desc: 'Powerful brain surge formula.', rating: '★★★★★ (2,123 reviews)', img: 'https://neurosurge.com/assets/images/1-desktop.png', link: 'https://bb85c5v10-cq4o62kr15xirld1.hop.clickbank.net' },
    { name: 'Neuro-Thrive', desc: 'Cognitive support for mental energy.', rating: '★★★★☆ (876 reviews)', img: 'https://neurothrive.com/assets/images/1-desktop.png', link: 'https://7ee7e8420n8z2kfiup0e-btd4p.hop.clickbank.net' },
    { name: 'NeuroZoom', desc: 'Advanced brain support for clarity.', rating: '★★★★★ (1,789 reviews)', img: 'https://neurozoom.com/assets/images/1-desktop.png', link: 'https://f08642x7x-lw9u0ctewi2bqj64.hop.clickbank.net' },
    { name: 'Pineal Pure', desc: 'Pineal gland support formula.', rating: '★★★★☆ (654 reviews)', img: 'https://pinealpure.com/assets/images/1-desktop.png', link: 'https://21fca--0o-ax6p3erkumvas8bj.hop.clickbank.net' },
    { name: 'ProMind Complex', desc: 'Complete brain complex for memory.', rating: '★★★★★ (1,234 reviews)', img: 'https://promindcomplex.com/assets/images/1-desktop.png', link: 'https://a915f5-2urineyco59z7ubel2r.hop.clickbank.net' },
  ],
}

const tips = [
  { icon: '💡', text: 'Start your day with a glass of warm water with lemon to kickstart your metabolism.' },
  { icon: '🌿', text: 'Include leafy greens in every meal - they are packed with essential nutrients.' },
  { icon: '😴', text: 'Aim for 7-9 hours of quality sleep each night for optimal recovery.' },
  { icon: '🚶', text: 'Take a 10-minute walk after meals to aid digestion and blood sugar control.' },
  { icon: '🧘', text: 'Practice deep breathing for 5 minutes daily to reduce stress and inflammation.' },
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('blood-sugar')
  const [currentTip, setCurrentTip] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const testimonials = [
    { text: 'The daily tips have transformed my morning routine. I feel more energized and focused!', author: 'Sarah Mitchell', title: 'Health Enthusiast' },
    { text: "This approach is sustainable and backed by science. The mindfulness exercises reduced my anxiety significantly.", author: 'James Chen', title: 'Software Engineer' },
    { text: 'At 58, I feel better than I did at 40. The fitness routines are gentle yet effective!', author: 'Robert Patterson', title: 'Retired Teacher' },
  ]

  return (
    <main>
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo">
            <span className="logo-icon">🌿</span>
            <span>Daily Vitality</span>
          </a>
          <nav className="nav-desktop">
            <a href="/" className="nav-link active">Home</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#tips" className="nav-link">Tips</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#newsletter" className="nav-link">Contact</a>
          </nav>
          <button className="hamburger" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Journey to <span className="accent">Vitality & Longevity</span>
            </h1>
            <p className="hero-subtitle">Discover evidence-based strategies to enhance your health, wellness, and lifespan through science-backed approaches.</p>
            <div className="hero-buttons">
              <a href="#products" className="btn btn-primary">Explore Products</a>
              <a href="#tips" className="btn btn-tracker">Daily Tips</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Wellness Topics</span>
              </div>
              <div className="stat">
                <span className="stat-number">35+</span>
                <span className="stat-label">Premium Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Community Members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="products" id="products">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Premium Selection</span>
            <h2 className="section-title">Top-Rated Supplements</h2>
            <p className="section-desc">Scientifically formulated products to support your health goals.</p>
          </div>

          <div className="category-tabs">
            <button className={`tab-btn ${activeCategory === 'blood-sugar' ? 'active' : ''}`} onClick={() => setActiveCategory('blood-sugar')}>🩸 Blood Support</button>
            <button className={`tab-btn ${activeCategory === 'joint' ? 'active' : ''}`} onClick={() => setActiveCategory('joint')}>🦴 Joint & Mobility</button>
            <button className={`tab-btn ${activeCategory === 'weight-loss' ? 'active' : ''}`} onClick={() => setActiveCategory('weight-loss')}>⚖️ Weight Loss</button>
            <button className={`tab-btn ${activeCategory === 'memory' ? 'active' : ''}`} onClick={() => setActiveCategory('memory')}>🧠 Memory Support</button>
          </div>

          <div className="products-grid active">
            {products[activeCategory].map((product, index) => (
              <div key={index} className="product-card">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <img src={product.img} alt={product.name} className="product-img" />
                <h3>{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <div className="product-rating">{product.rating}</div>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className={`product-btn ${index === 0 ? 'btn-product-primary' : 'btn-product-secondary'}`}>
                  Shop Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Tips */}
      <section className="daily-tips" id="tips">
        <div className="container">
          <div className="tips-wrapper">
            <div className="section-header">
              <span className="section-tag">Daily Wellness</span>
              <h2 className="section-title">Daily Tips</h2>
            </div>
            <div className="tip-display">
              <span className="tip-icon">{tips[currentTip].icon}</span>
              <p className="tip-text">{tips[currentTip].text}</p>
            </div>
            <div className="tip-nav">
              <button className="tip-arrow" onClick={() => setCurrentTip((currentTip - 1 + tips.length) % tips.length)}>←</button>
              <div className="tip-dots">
                {tips.map((_, index) => (
                  <button key={index} className={`tip-dot ${index === currentTip ? 'active' : ''}`} onClick={() => setCurrentTip(index)} />
                ))}
              </div>
              <button className="tip-arrow" onClick={() => setCurrentTip((currentTip + 1) % tips.length)}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Success Stories</span>
            <h2 className="section-title">What Our Community Says</h2>
          </div>
          <div className="testimonial-carousel">
            <div className="testimonial-track" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.author.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <p className="author-name">{testimonial.author}</p>
                      <p className="author-title">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button key={index} className={`carousel-dot ${index === testimonialIndex ? 'active' : ''}`} onClick={() => setTestimonialIndex(index)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter" id="newsletter">
        <div className="container">
          <div className="newsletter-box">
            <span className="section-tag">Stay Connected</span>
            <h2 className="section-title">Join the Vitality Community</h2>
            <p className="newsletter-desc">Get daily wellness tips and longevity insights delivered to your inbox.</p>
            <form className="newsletter-form">
              <input type="email" className="newsletter-input" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
            <p className="newsletter-note">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <span>🌿</span> Daily Vitality
              </div>
              <p className="footer-desc">Your trusted source for evidence-based wellness and longevity strategies.</p>
            </div>
            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#tips">Tips</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Topics</h4>
              <ul className="footer-links">
                <li><a href="#">Nutrition</a></li>
                <li><a href="#">Fitness</a></li>
                <li><a href="#">Mindfulness</a></li>
                <li><a href="#">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Contact</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact Form</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Daily Vitality & Longevity Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}