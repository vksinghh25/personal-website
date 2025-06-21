"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const sections = {
  home: (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>
      <div className="text-base leading-relaxed space-y-4">
        <p>
          I'm a <span className="font-semibold text-blue-300">Software Engineer at Google</span>, where I work on building
          <span className="font-semibold text-green-300"> GenAI products</span> for Google Ads. I'm passionate about leveraging
          technology to solve complex problems and create innovative solutions that make a real impact.
        </p>
        <p>
          When I'm not coding or thinking about AI, you'll find me <span className="font-semibold text-orange-300"> running</span> through the streets in Gurgaon & Bangalore, <span className="font-semibold text-purple-300"> reading</span> thought-provoking books, or 
          <span className="font-semibold text-red-300"> lifting heavy weights</span> at the gym. These activities keep me
          balanced and constantly pushing my limits both mentally and physically.
        </p>
        <p className="text-sm text-gray-400 mt-6">
          Feel free to explore my bookshelf to see what I'm reading, or check out my writing for insights on AI, technology, and life.
        </p>
      </div>
    </div>
  ),
  bookshelf: null, // Will be handled separately with pagination
  writing: null, // Will be handled separately with pagination
};

// LinkedIn posts data
const linkedinPosts = [
  { id: 1, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7341455223581786113", height: 500 },
  { id: 2, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7325149930732277760", height: 400 },
  { id: 3, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7317218109981970432", height: 250 },
  { id: 4, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7283742168605773824", height: 500 },
  { id: 5, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7253658163638345728", height: 600 },
  { id: 6, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7223678732505378816", height: 700 },
  { id: 7, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7195292601032351744", height: 500 },
  { id: 8, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7172155767351861248", height: 600 },
  { id: 9, src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7118844414747193344", height: 900 },
];

// Books data with additional information
const books = [
  {
    id: 1,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "/sapiens.jpg",
    description: "A brief history of humankind, exploring how Homo sapiens became the planet's dominant species.",
    year: 2011,
    genre: "History, Anthropology"
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/psy.jpg",
    description: "Timeless lessons on wealth, greed, and happiness, focusing on the human side of finance.",
    year: 2020,
    genre: "Finance, Psychology"
  },
  {
    id: 3,
    title: "12 Rules for Life",
    author: "Jordan B. Peterson",
    cover: "/rules.jpg",
    description: "A practical guide to living a meaningful life, blending psychology, philosophy, and personal anecdotes.",
    year: 2018,
    genre: "Self-Help, Philosophy"
  },
  {
    id: 4,
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    cover: "/brothers.jpg",
    description: "A profound exploration of faith, doubt, and morality in one of the greatest novels ever written.",
    year: 1880,
    genre: "Classic Literature, Philosophy"
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/mockingbird.jpg",
    description: "A powerful novel about racial injustice and moral growth in the Deep South, seen through the eyes of young Scout Finch.",
    year: 1960,
    genre: "Classic Literature, Social Justice"
  },
  {
    id: 6,
    title: "The Stranger",
    author: "Albert Camus",
    cover: "/stranger.jpg",
    description: "A classic of existential literature, exploring absurdity and detachment through the story of Meursault in French Algeria.",
    year: 1942,
    genre: "Existentialism, Philosophy"
  },
  {
    id: 7,
    title: "Letters from Seneca",
    author: "Seneca",
    cover: "/seneca.jpg",
    description: "A collection of moral epistles offering timeless wisdom on Stoic philosophy, virtue, and the art of living well.",
    year: 65,
    genre: "Philosophy, Stoicism"
  },
  {
    id: 8,
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    cover: "/naval.jpg",
    description: "A curated collection of Naval Ravikant's wisdom on wealth, happiness, and life philosophy, compiled from his tweets, essays, and interviews.",
    year: 2020,
    genre: "Philosophy, Self-Help"
  },
  {
    id: 9,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    cover: "/crime.jpg",
    description: "A psychological thriller exploring guilt, redemption, and the human condition through the story of a young man who commits murder.",
    year: 1866,
    genre: "Classic Literature, Psychology"
  },
  {
    id: 10,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    cover: "/habits.jpg",
    description: "A comprehensive guide to personal and professional effectiveness through seven fundamental principles that transform how we approach life.",
    year: 1989,
    genre: "Self-Help, Leadership"
  },
  {
    id: 11,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/atomic.jpg",
    description: "An evidence-based approach to building good habits and breaking bad ones through tiny changes that lead to remarkable results.",
    year: 2018,
    genre: "Self-Help, Psychology"
  },
  {
    id: 12,
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    cover: "/diary.jpg",
    description: "The powerful and moving diary of a young Jewish girl hiding from the Nazis during World War II, offering a unique perspective on hope and humanity.",
    year: 1947,
    genre: "Memoir, History"
  },
  {
    id: 13,
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    cover: "/search.jpg",
    description: "A psychiatrist's memoir of surviving the Holocaust and his development of logotherapy, exploring how finding meaning in suffering can lead to resilience.",
    year: 1946,
    genre: "Psychology, Philosophy"
  }
];

const postsPerPage = 3;
const booksPerPage = 3;

// Add a LinkedIn logo SVG for preview
const LinkedInLogo = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#0A66C2" fillOpacity="0.2" />
    <path d="M14.5 19.5H19V34H14.5V19.5ZM16.75 16C15.65 16 14.75 16.9 14.75 18C14.75 19.1 15.65 20 16.75 20C17.85 20 18.75 19.1 18.75 18C18.75 16.9 17.85 16 16.75 16ZM21.5 19.5H25.75V21.13H25.81C26.39 20.09 27.67 19 29.54 19C33.13 19 33.75 21.13 33.75 24.13V34H29.25V25.13C29.25 23.63 29.22 21.63 27.25 21.63C25.25 21.63 25 23.34 25 25.25V34H20.5V19.5H21.5Z" fill="#0A66C2" fillOpacity="0.5" />
  </svg>
);

// Helper: Get a placeholder title from the LinkedIn post URL
function getLinkedInTitle(src: string, id: number) {
  return `LinkedIn Post #${id}`;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<"home" | "bookshelf" | "writing">("home");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBooksPage, setCurrentBooksPage] = useState(1);

  // Add extra top padding if bookshelf or writing is active
  const mainPaddingTop = ["bookshelf", "writing"].includes(activeSection) ? "pt-20" : "";

  // Calculate pagination for posts
  const totalPages = Math.ceil(linkedinPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = linkedinPosts.slice(startIndex, endIndex);

  // Calculate pagination for books
  const totalBooksPages = Math.ceil(books.length / booksPerPage);
  const startBooksIndex = (currentBooksPage - 1) * booksPerPage;
  const endBooksIndex = startBooksIndex + booksPerPage;
  const currentBooks = books.slice(startBooksIndex, endBooksIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBooksPageChange = (page: number) => {
    setCurrentBooksPage(page);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white ${mainPaddingTop}`}>
      <div className="relative mb-6 group -mt-12 z-10">
        <Image
          src="/vk.JPG"
          alt="Hero image"
          width={160}
          height={160}
          className="rounded-full border-4 border-blue-500 shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
          priority
        />
        {/* Overlay for subtle shade */}
        <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div className="flex space-x-6 mb-8">
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeSection === "home" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-100"}`}
          onClick={() => setActiveSection("home")}
        >
          Home
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeSection === "bookshelf" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-100"}`}
          onClick={() => setActiveSection("bookshelf")}
        >
          Bookshelf
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeSection === "writing" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-100"}`}
          onClick={() => setActiveSection("writing")}
        >
          Writing
        </button>
      </div>
      <h1 className="text-4xl font-bold mb-6">Hey, I'm Vipan!! <span role="img" aria-label="waving hand">👋</span></h1>
      {/* Section content at the bottom */}
      <div className="w-full max-w-4xl mt-16 border-t pt-8">
        {activeSection === "writing" ? (
          <div>
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-4">For my latest work, find me on:</p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.linkedin.com/in/vksinghh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://vksinghh.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
                >
                  Substack
                </a>
              </div>
            </div>
            <div className="flex flex-col space-y-8">
              {currentPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-zinc-900/80 rounded-lg shadow border border-zinc-700 p-4 flex items-center justify-center"
                  style={{ height: `${post.height}px` }}
                >
                  <iframe
                    src={post.src}
                    height={post.height}
                    width="100%"
                    frameBorder="0"
                    allowFullScreen={true}
                    title="Embedded post"
                    className="rounded-lg brightness-75 contrast-110"
                  />
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="mt-8 pt-8 border-t border-zinc-700">
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    className="px-3 py-2 rounded-md bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`px-3 py-2 rounded-md transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    className="px-3 py-2 rounded-md bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition-colors"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : activeSection === "bookshelf" ? (
          <div className="flex flex-col space-y-8">
            <div className="text-center mb-4">
              <blockquote className="text-xl italic font-semibold text-blue-300">"A reader lives a thousand lives before he dies."</blockquote>
              <div className="text-sm text-gray-400 mt-2">— George R.R. Martin</div>
            </div>
            
            {currentBooks.map((book) => (
              <div key={book.id} className="flex items-start space-x-8 p-8 bg-zinc-900/80 rounded-lg shadow border border-zinc-700">
                <img src={book.cover} alt={`${book.title} cover`} className="w-28 h-40 object-cover rounded shadow-md" />
                <div className="flex flex-col justify-center flex-1">
                  <div className="text-2xl font-bold mb-2">{book.title}</div>
                  <div className="text-gray-300 mb-2">{book.author}</div>
                  <div className="text-sm text-gray-400 mb-3">
                    {book.year} • {book.genre}
                  </div>
                  <div className="text-base mb-3">{book.description}</div>
                </div>
              </div>
            ))}
            
            {/* Bookshelf Pagination */}
            {totalBooksPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8 pt-8 border-t border-zinc-700">
                <button 
                  className="px-3 py-2 rounded-md bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleBooksPageChange(currentBooksPage - 1)}
                  disabled={currentBooksPage === 1}
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalBooksPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-2 rounded-md transition-colors ${
                        currentBooksPage === page 
                          ? "bg-blue-600 text-white" 
                          : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                      }`}
                      onClick={() => handleBooksPageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  className="px-3 py-2 rounded-md bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition-colors"
                  onClick={() => handleBooksPageChange(currentBooksPage + 1)}
                  disabled={currentBooksPage === totalBooksPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          sections[activeSection]
        )}
      </div>
    </main>
  );
}
