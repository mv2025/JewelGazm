import { CaseStudy, PortfolioCategory } from './types';
import { PORTFOLIO_CATEGORIES, MOCK_CASE_STUDIES } from './mockPortfolio';

export const portfolio = {
  // Fetch all portfolio categories
  async getCategories(): Promise<PortfolioCategory[]> {
    await new Promise(r => setTimeout(r, 100));
    return [...PORTFOLIO_CATEGORIES];
  },

  // Fetch all case studies
  async getCaseStudies(category?: string): Promise<CaseStudy[]> {
    await new Promise(r => setTimeout(r, 150));
    if (category) {
      return MOCK_CASE_STUDIES.filter(cs => cs.category.toLowerCase() === category.toLowerCase());
    }
    return [...MOCK_CASE_STUDIES];
  },

  // Fetch a specific case study by its handle
  async getCaseStudyByHandle(handle: string): Promise<CaseStudy | null> {
    await new Promise(r => setTimeout(r, 200));
    const project = MOCK_CASE_STUDIES.find(cs => cs.handle === handle);
    return project ? JSON.parse(JSON.stringify(project)) : null;
  },

  // Fetch featured case studies
  async getFeaturedCaseStudies(): Promise<CaseStudy[]> {
    await new Promise(r => setTimeout(r, 100));
    return MOCK_CASE_STUDIES.filter(cs => cs.featured);
  },

  // Fetch related case studies
  async getRelatedCaseStudies(currentId: string, category: string): Promise<CaseStudy[]> {
    await new Promise(r => setTimeout(r, 150));
    return MOCK_CASE_STUDIES.filter(cs => cs.id !== currentId && cs.category === category).slice(0, 3);
  }
};

export * from './types';
