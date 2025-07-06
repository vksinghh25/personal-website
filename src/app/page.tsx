"use client";
import Image from "next/image";
import { useState } from "react";
import HoverImageLink from "@/components/HoverImageLink";

const sections = {
  home: (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>
      <div className="text-base leading-relaxed space-y-4">
        <p>
          I&apos;m a <span className="font-semibold text-blue-300">Software Engineer at Google</span>, currently wrangling
          <span className="font-semibold text-green-300"> GenAI products</span> for the world of Ads. My goal is to leverage technology to solve complex problems and build products that make a genuine impact.
        </p>
        <p>
          When I&apos;m not debugging code, I&apos;m usually debugging my own human OS. You&apos;ll find me stress-testing myself
          <HoverImageLink imgSrc="/running.jpg">
            <span className="font-semibold text-orange-300"> running through the streets</span>
          </HoverImageLink> of Gurgaon & Bangalore, downloading new ideas from{" "}
          <HoverImageLink imgSrc="/books.jpg">
            <span className="font-semibold text-purple-300"> thought-provoking books</span>
          </HoverImageLink>, or arguing with <HoverImageLink imgSrc="/gym.jpg"><span className="font-semibold text-red-300">gravity at the gym</span></HoverImageLink>.
        </p>
        <p className="text-sm text-gray-400 mt-6">
          Feel free to explore my bookshelf to see the source code for my thoughts, or check out my writing for musings on tech, AI, and other things I pretend to understand.
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
    id: 3,
    title: "12 Rules for Life",
    author: "Jordan B. Peterson",
    cover: "/rules.jpg",
    description: "A practical guide to living a meaningful life, blending psychology, philosophy, and personal anecdotes.",
    year: 2018,
    genre: "Self-Help, Philosophy"
  },
  {
    id: 15,
    title: "Born to Run",
    author: "Christopher McDougall",
    cover: "/born-to-run.jpg",
    description: "A fascinating exploration of the world's greatest distance runners and the secrets of human endurance, blending adventure, science, and the joy of running.",
    year: 2009,
    genre: "Sports, Adventure"
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
    id: 7,
    title: "Letters from Seneca",
    author: "Seneca",
    cover: "/seneca.jpg",
    description: "A collection of moral epistles offering timeless wisdom on Stoic philosophy, virtue, and the art of living well.",
    year: 65,
    genre: "Philosophy, Stoicism"
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
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/psy.jpg",
    description: "Timeless lessons on wealth, greed, and happiness, focusing on the human side of finance.",
    year: 2020,
    genre: "Finance, Psychology"
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
    id: 14,
    title: "Invisible Man",
    author: "Ralph Ellison",
    cover: "/invisible.jpg",
    description: "A powerful novel about race, identity, and invisibility in 20th-century America, following an unnamed Black protagonist's journey.",
    year: 1952,
    genre: "Classic Literature, Social Commentary"
  },
  {
    id: 13,
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    cover: "/search.jpg",
    description: "A psychiatrist's memoir of surviving the Holocaust and his development of logotherapy, exploring how finding meaning in suffering can lead to resilience.",
    year: 1946,
    genre: "Psychology, Philosophy"
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
    id: 4,
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    cover: "/brothers.jpg",
    description: "A profound exploration of faith, doubt, and morality in one of the greatest novels ever written.",
    year: 1880,
    genre: "Classic Literature, Philosophy"
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
    id: 1,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "/sapiens.jpg",
    description: "A brief history of humankind, exploring how Homo sapiens became the planet's dominant species.",
    year: 2011,
    genre: "History, Anthropology"
  }
];

const postsPerPage = 3;
const booksPerPage = 3;

export default function Home() {
  const [activeSection, setActiveSection] = useState<"home" | "bookshelf" | "writing">("home");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBooksPage, setCurrentBooksPage] = useState(1);

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
    <main className={`flex min-h-screen flex-col items-center p-8 pt-12 bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white`}>
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
        {/* Left side: Hero Image */}
        <div className="relative group shrink-0">
          <Image
            src="/vk.JPG"
            alt="Hero image"
            width={160}
            height={160}
            className="rounded-full border-4 border-blue-500 shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
            priority
          />
          <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Right side: Title and Navigation */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-4xl font-bold mb-4">Hey, I&apos;m Vipan!! <span role="img" aria-label="waving hand">👋</span></h1>
          <div className="flex space-x-4">
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
        </div>
      </div>
      
      {/* Section content at the bottom */}
      <div className="w-full max-w-4xl border-t pt-8">
        {activeSection === "writing" ? (
          <div>
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-4">For my latest work, find me on:</p>
              <div className="flex justify-center space-x-4">
                <a href="https://www.linkedin.com/in/vksinghh/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  LinkedIn
                </a>
                <a href="https://vksinghh.substack.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-600 transition-colors">
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
                    height="100%"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen={true}
                    title="Embedded post"
                    className="rounded-lg brightness-75 contrast-110"
                  />
                </div>
              ))}
            </div>
            {/* Pagination controls */}
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-full ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        ) : activeSection === "bookshelf" ? (
          <div className="flex flex-col space-y-8">
            {currentBooks.map((book) => (
              <div key={book.id} className="flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-8 p-6 bg-zinc-900/80 rounded-lg shadow border border-zinc-700">
                <Image src={book.cover} alt={`${book.title} cover`} width={144} height={208} className="w-36 h-52 object-cover rounded shadow-lg border-4 border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 shrink-0" />
                <div className="flex flex-col text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                  <p className="text-gray-300 mb-2">by {book.author}</p>
                  <p className="text-sm text-gray-400 mb-3">
                    {book.year} • {book.genre}
                  </p>
                  <p className="text-base">{book.description}</p>
                  {/* Inspiring quote */}
                  <p className="mt-4 italic text-blue-400 text-base">“{(() => {
                    switch (book.title) {
                      case "Sapiens":
                        return "One of history's few iron laws is that luxuries tend to become necessities and to spawn new obligations.";
                      case "The Psychology of Money":
                        return "Money's greatest intrinsic value—and this can't be overstated—is its ability to give you control over your time.";
                      case "12 Rules for Life":
                        return "Compare yourself to who you were yesterday, not to who someone else is today.";
                      case "The Brothers Karamazov":
                        return "The mystery of human existence lies not in just staying alive, but in finding something to live for.";
                      case "To Kill a Mockingbird":
                        return "You never really understand a person until you consider things from his point of view… Until you climb inside of his skin and walk around in it.";
                      case "The Stranger":
                        return "I may not have been sure about what really did interest me, but I was absolutely sure about what didn't.";
                      case "Letters from Seneca":
                        return "We suffer more often in imagination than in reality.";
                      case "The Almanack of Naval Ravikant":
                        return "Desire is a contract you make with yourself to be unhappy until you get what you want.";
                      case "Crime and Punishment":
                        return "To go wrong in one's own way is better than to go right in someone else's.";
                      case "The 7 Habits of Highly Effective People":
                        return "I am not a product of my circumstances. I am a product of my decisions.";
                      case "Atomic Habits":
                        return "You do not rise to the level of your goals. You fall to the level of your systems.";
                      case "The Diary of a Young Girl":
                        return "In spite of everything, I still believe that people are really good at heart.";
                      case "Man's Search for Meaning":
                        return "When we are no longer able to change a situation, we are challenged to change ourselves.";
                      case "Invisible Man":
                        return "When I discover who I am, I'll be free.";
                      case "Born to Run":
                        return "You don't stop running because you get old, you get old because you stop running.";
                      default:
                        return "";
                    }
                  })()}”</p>
                </div>
              </div>
            ))}
            {/* Bookshelf Pagination: Match Writings Page */}
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalBooksPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-full ${currentBooksPage === page ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => handleBooksPageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ minHeight: '40vh' }}>
            {sections[activeSection]}
          </div>
        )}
      </div>
    </main>
  );
}
