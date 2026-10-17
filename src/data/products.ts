import glovesImage from '../assets/products/gloves.webp'
import cleanroomImage from '../assets/products/cleanroom-esd.webp'
import ppeImage from '../assets/products/ppe.webp'
import giveawayImage from '../assets/products/corporate-giveaways.webp'
import cleaningImage from '../assets/products/cleaning-solutions.webp'
import technologyImage from '../assets/products/technology-engineering.webp'
import officeImage from '../assets/products/office-school.webp'
import roadSafetyImage from '../assets/products/road-safety.webp'

export const products = [
  { id: '01', name: 'Gloves', description: 'Hand protection for industrial work, general handling and controlled environments.', tag: 'Protection', image: glovesImage },
  { id: '02', name: 'Cleanroom / ESD Consumables', description: 'Consumables for clean production areas and static-sensitive applications.', tag: 'Controlled environments', image: cleanroomImage },
  { id: '03', name: 'Personal Protective Equipment', description: 'Head, hearing, respiratory and visibility protection for workplace requirements.', tag: 'Workplace safety', image: ppeImage },
  { id: '04', name: 'Corporate Giveaway Products', description: 'Practical branded merchandise for events, teams and business relationships.', tag: 'Corporate essentials', image: giveawayImage },
  { id: '05', name: 'Industrial Grade Cleaning Solutions', description: 'Cleaning tools and consumables for routine facility and workplace care.', tag: 'Facility care', image: cleaningImage },
  { id: '06', name: 'Technology, Software & Engineering Services', description: 'Technical services coordinated around the requirements of each project brief.', tag: 'Technical solutions', image: technologyImage },
  { id: '07', name: 'Office & School Supplies', description: 'Daily-use stationery, filing and desk essentials for organizations and learning spaces.', tag: 'Everyday essentials', image: officeImage },
  { id: '08', name: 'Road Safety & Traffic Control Supplies', description: 'Visibility and traffic-control essentials for sites, roads and active work zones.', tag: 'Site safety', image: roadSafetyImage },
] as const
