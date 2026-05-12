"use client";
import React, { useEffect, useState, useRef } from "react";
import { getContactMessages } from "@/app/actions";
import { HiChevronDown, HiLockClosed } from "react-icons/hi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { inter } from "@/app/fonts";

const ContactMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  
  // Password State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const container = useRef(null);
  const loginRef = useRef(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    const result = await getContactMessages(1);
    if (result.success) setMessages(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  // Handle Password Check
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "first") { // Your specific password
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      // Shake animation for wrong password
      gsap.to(loginRef.current, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
    }
  };

  useGSAP(() => {
    if (expandedId) {
      gsap.fromTo(
        `#details-${expandedId}`,
        { height: 0, opacity: 0 },
        { 
          height: "auto", 
          opacity: 1, 
          duration: 0.3, 
          ease: "power3.out" 
        }
      );
    }
  }, { scope: container, dependencies: [expandedId] });

  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // --- Login UI ---
  if (!isAuthenticated) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-zinc-50 ${inter.className}`}>
        <div ref={loginRef} className="w-full max-w-sm p-8 bg-white rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <HiLockClosed className="text-zinc-600" size={24} />
            </div>
            <h1 className="text-xl font-semibold">Protected Area</h1>
            <p className="text-sm text-zinc-500 text-center mt-1">Please enter your password to view messages.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border ${error ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm`}
              autoFocus
            />
            {error && <p className="text-xs text-red-500 font-medium">Incorrect password. Try again.</p>}
            <button
              type="submit"
              className="w-full bg-zinc-950 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className={`p-6 md:p-10 bg-white min-h-screen text-zinc-950 selection:bg-zinc-100 ${inter.className}`} ref={container}>
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">Messages</h1>
            <p className="text-sm text-zinc-500">View and manage incoming contact inquiries.</p>
          </div>
          <div className="px-2.5 py-0.5 rounded-full border border-zinc-200 bg-zinc-50 text-[12px] font-medium text-zinc-600">
            {messages.length} Total
          </div>
        </header>

        <div className="rounded-md border border-zinc-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50 transition-colors">
                <th className="h-10 px-4 text-left align-middle font-medium text-zinc-500 w-[50px]"></th>
                <th className="h-10 px-4 text-left align-middle font-medium text-zinc-500">Sender</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-zinc-500 hidden sm:table-cell">Interest</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-zinc-500">Date</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-zinc-500">
                    <span className="animate-pulse">Loading inquiries...</span>
                  </td>
                </tr>
              ) : messages.map((item) => (
                <React.Fragment key={item.id}>
                  <tr 
                    onClick={() => toggleRow(item.id)}
                    className={`border-b border-zinc-100 transition-colors hover:bg-zinc-50/50 cursor-pointer ${expandedId === item.id ? 'bg-zinc-50' : ''}`}
                  >
                    <td className="p-4 align-middle">
                      <HiChevronDown 
                        size={16} 
                        className={`text-zinc-400 transition-transform duration-200 ${expandedId === item.id ? 'rotate-180 text-zinc-950' : ''}`} 
                      />
                    </td>
                    <td className="p-4 align-middle font-medium">
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-xs font-normal text-zinc-500">{item.email}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden sm:table-cell">
                      <span className="inline-flex items-center rounded-full border border-zinc-200 px-2 py-0.5 text-[11px] font-medium transition-colors">
                        {item.interest}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right text-zinc-500">
                      {new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </td>
                  </tr>

                  {expandedId === item.id && (
                    <tr>
                      <td colSpan={4} className="p-0 border-none bg-zinc-50/30">
                        <div id={`details-${item.id}`} className="overflow-hidden border-b border-zinc-100">
                          <div className="p-6 pl-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Company</h4>
                                <p className="text-sm font-medium text-zinc-900">{item.company || "Not Specified"}</p>
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Submitted On</h4>
                                <p className="text-sm font-medium text-zinc-900">{new Date(item.submitted_at).toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Message</h4>
                              <div className="bg-white border border-zinc-200 rounded-lg p-4 text-sm leading-relaxed text-zinc-700 shadow-sm">
                                {item.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactMessagesPage;