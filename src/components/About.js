import React from "react";

const About = () => {
    const sections = [
        {
          title: "Welcome to LitLink!",
          content:
          "LitLink is your digital haven for all things books. We’re an online book club designed for readers who want to connect, share insights, and discuss everything from bestsellers to hidden gems. Whether you’re passionate about thrillers, fantasy, non-fiction, or classics, LitLink is here to bring together book lovers from around the world.",
        },
        {
          title: "What are we about?",
          content:
           "Our mission is simple: create a space where readers can explore new titles, leave thoughtful reviews, and engage in meaningful conversations. Dive into our blog posts, contribute to community discussions, or browse curated book lists to find your next favorite read.",
        },
        {
          title: "Join us at LitLink, and let's turn pages together, one review at a time.",
        },
      ];
    
      return (
        <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {sections.map((section, index) => (
            <div key={index} className="text-center">
              <h2 className="font-bold text-3xl text-black-800">{section.title}</h2>
              <p className="text-lg text-black-600 mt-4">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
      );
};
export default About;