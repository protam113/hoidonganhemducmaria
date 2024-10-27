import Hero from "@/components/layouts/DefaultLayout/components/Hero";
import { Content } from "@/components/home/News";

// src/pages/index.tsx
const Home = () => {
  return (
    <div>
      <Hero />
      <Content />
      <h1> Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;
