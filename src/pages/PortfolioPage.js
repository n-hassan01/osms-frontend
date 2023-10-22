import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
// external css
import '../_css/PortfolioPage.css';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const portfolioSections = [
    {
      id: '1',
      title: 'About me',
      subtitle: 'who I am..',
      cover: '/assets/images/banners/presentation.png',
    },
    {
      id: '2',
      title: 'Educations',
      subtitle: 'what I learn..',
      cover: '/assets/images/banners/mortarboard.png',
    },
    {
      id: '3',
      title: 'Professions',
      subtitle: 'what I do..',
      cover: '/assets/images/banners/profession.png',
    },
    {
      id: '4',
      title: 'Achievements',
      subtitle: 'what I have earned..',
      cover: '/assets/images/banners/band.png',
    },
  ];

  return (
    <>
      <Helmet>
        <title> Dashboard: Portfolio | Mamun Chowdhury </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Portfolio
        </Typography>

        <section className="home" id="home">
          <div className="max-width">
            <div className="home-content">
              <div className="text-1">Hello, my name is</div>
              <div className="text-2">Mamun Chowdhury</div>
              <div className="text-3">
                And I'm a Professor
              </div>
            </div>
          </div>
        </section>

        <ProductList products={portfolioSections} />
      </Container>
    </>
  );
}
