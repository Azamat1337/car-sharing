import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <div>
                <Features />
                <Footer />
            </div>
        </>
    );
};

export default Home;
