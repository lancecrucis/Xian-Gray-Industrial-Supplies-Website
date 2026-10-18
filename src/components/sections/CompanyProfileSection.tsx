import profileQr from '../../assets/company-profile-qr.svg'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const profileUrl = 'https://drive.google.com/file/d/18HdBQFWmOszdvLRPaa_2QZcZMbKMMceg/view?usp=sharing'

export function CompanyProfileSection() {
  return <section className="section profile-section" aria-labelledby="profile-title">
    <Container className="profile-grid">
      <div className="profile-copy" data-reveal="up">
        <p className="profile-kicker">Company profile</p>
        <SectionHeading title={<span id="profile-title">Get to know Xian &amp; Gray.</span>}>
          Review our company, supply categories and sourcing approach in one concise presentation.
        </SectionHeading>
        <div className="profile-actions">
          <Button href={profileUrl} target="_blank" rel="noreferrer">View company profile</Button>
          <Button href="#contact" variant="secondary">Discuss your requirements</Button>
        </div>
        <p className="profile-note">Opens securely in Google Drive. You can view the presentation online or use the available download option.</p>
      </div>
      <div className="profile-qr-card" data-reveal="up">
        <div className="profile-qr-frame"><img src={profileQr} alt="QR code for the Xian & Gray company profile on Google Drive" width="640" height="640" /></div>
        <div><span>On your phone?</span><strong>Scan to view the company profile</strong><a href={profileUrl} target="_blank" rel="noreferrer">Or open the presentation link</a></div>
      </div>
    </Container>
  </section>
}
