import React from "react";

const LandingPage = () => {
    const sections = [
        {
          title: "Discover new worlds with our Book of the Month",
          content:
          "Embark on a journey to uncharted territories with our featured book this month. Dive into tales of adventure, magic, and discovery that will leave you captivated. Each story promises to transport you to a realm where imagination knows no bounds.",
        },
        {
          title: "Amazing new titles coming this 2024!",
          content:
           "Get ready for an exciting lineup of books set to release in 2024! From gripping thrillers to heartwarming romances, this year is packed with stories that cater to every reader's taste. Mark your calendars and prepare your shelves for these must-reads.",
        },
        {
          title: "Don’t know what to read, check these ones out!",
          content:
            "Not sure where to start? Explore our curated list of top picks designed for every mood and genre. Whether you're in the mood for a mystery, a classic, or a light-hearted comedy, we’ve got something just for you.",
        },
        {
          title: "Long live the classics!",
          content:
            "Rediscover the timeless magic of literary classics that have stood the test of time. These iconic works continue to inspire readers across generations, offering rich stories and unforgettable characters that are as relevant today as they were when first written.",
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

export default LandingPage;