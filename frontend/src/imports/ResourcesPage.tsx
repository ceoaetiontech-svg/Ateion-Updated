import {
  BookOpen,
  Rocket,
  Sprout,
  FolderKanban,
  BookMarked,
  Award,
  Compass,
  Map,
  TrendingUp,
  Sparkles,
  ListVideo,
  Zap,
  Heart,
  Brain,
  Lightbulb,
  Smile,
  Wind,
  StickyNote,
  CheckSquare,
  Calendar,
  FileText,
  Target,
  FolderOpen,
  User,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger
} from "../app/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../app/components/ui/collapsible";

const navigationSections = [
  {
    title: "Courses",
    icon: BookOpen,
    items: [
      { title: "My Courses", icon: BookMarked },
      { title: "Discover Courses", icon: Compass },
      { title: "Learning Paths", icon: Map },
      { title: "Completed Courses", icon: Award },
    ],
  },
  {
    title: "Upskill",
    icon: Rocket,
    items: [
      { title: "Skill Playlists", icon: ListVideo },
      { title: "Trending Skills", icon: TrendingUp },
      { title: "Certifications", icon: Award },
      { title: "Quick Learning", icon: Zap },
      { title: "AI Skills", icon: Sparkles },
    ],
  },
  {
    title: "Evolve",
    icon: Sprout,
    items: [
      { title: "Wellness Hub", icon: Heart },
      { title: "Mental Health", icon: Brain },
      { title: "Growth Mindset", icon: Lightbulb },
      { title: "Confidence Building", icon: Smile },
      { title: "Stress Management", icon: Wind },
      { title: "Daily Reflection", icon: StickyNote },
    ],
  },
  {
    title: "Organise",
    icon: FolderKanban,
    items: [
      { title: "Tasks", icon: CheckSquare },
      { title: "Calendar", icon: Calendar },
      { title: "Notes", icon: FileText },
      { title: "Goal Planning", icon: Target },
      { title: "Resources", icon: FolderOpen },
    ],
  },
];


export default function ResourcesPage() {
   const [userProfile, setUserProfile] = useState({
    fullName: "Loading...",
    firstName: "Student",
    segmentText: "Universal Access",
    isPremium: false
  });
  const [activeView, setActiveView] = useState("Dashboard");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete React Hooks Assignment", date: "Tomorrow", priority: "high", completed: false },
    { id: 2, title: "Watch Data Visualization Lecture", date: "May 29, 2026", priority: "medium", completed: false },
    { id: 3, title: "Submit Project Proposal", date: "May 30, 2026", priority: "high", completed: true },
  ]);

   const [selectedMood, setSelectedMood] = useState("Good");

  // Function to check/uncheck tasks
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 2. Fetch user data on component mount
  useEffect(() => {
    // Read the user object saved during Login/Sign Up
    const storedUser = localStorage.getItem("user"); 
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Map the backend age group code to the UI badge text
      let mappedSegment = "Universal Access";
      switch(parsedUser.ageGroup) {
        case "group_1": mappedSegment = "Segment 1 • Age 6-8"; break;
        case "group_2": mappedSegment = "Segment 2 • Age 9-11"; break;
        case "group_3": mappedSegment = "Segment 3 • Age 12-14"; break;
        case "group_4": mappedSegment = "Segment 4 • Age 15-17"; break;
        case "group_5": mappedSegment = "Segment 5 • Age 18+"; break;
      }

      setUserProfile({
        fullName: parsedUser.fullName || "Student",
        firstName: parsedUser.fullName ? parsedUser.fullName.split(" ") : "Student",
        segmentText: mappedSegment,
        // Optional: you can check if they have paid or hit the 3 video limit here
        isPremium: parsedUser.isPremium || false 
      });
    }
  }, []);
  return (
      <SidebarProvider>
        <div className="flex h-screen w-full bg-[#F7F3EB]">
          {/* SIDEBAR */}
          <Sidebar
              variant="sidebar"
              collapsible="icon"
              className="border-r-0"
          >
            <div className="flex h-screen flex-col bg-[#1E1632] text-white">
              {/* LOGO */}
              <SidebarHeader 
          className="px-4 py-6 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setActiveView("Dashboard")}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FB4444] text-white">
              <Rocket size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'OV Soge', sans-serif" }}>Ateion</span>
              <span className="text-[10px] text-white/60 tracking-widest font-bold uppercase">Playground</span>
            </div>
          </div>
        </SidebarHeader>

              {/* MENU */}
              <SidebarContent className="px-2">
                {navigationSections.map((section) => (
    <Collapsible key={section.title} defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full items-center text-white/70 hover:text-white">
            <section.icon className="mr-2 h-4 w-4" />
            {section.title}
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={`text-white/70 hover:text-white hover:bg-white/10 transition-colors ${activeView === item.title ? 'bg-white/20 text-white font-bold' : ''}`}
                    onClick={() => setActiveView(item.title)} // <--- ADD THIS ONCLICK
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  ))}
              </SidebarContent>

              {/* FOOTER */}
              <SidebarFooter>
                <SidebarSeparator />

                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white hover:bg-white/10">
                      <User size={16} />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white hover:bg-white/10">
                      <Settings size={16} />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white hover:bg-white/10">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </div>
          </Sidebar>
          <SidebarInset className="flex flex-1 flex-col overflow-x-hidden bg-transparent w-full">
          
           {/* 1. TOP HEADER WITH DYNAMIC AGE BADGE */}
        <header className="flex h-16 sm:h-20 items-center justify-between px-6 lg:px-10 bg-white/60 backdrop-blur-md border-b border-gray-100 shrink-0">
         <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden" /> 
            <h1 
              className="text-xl sm:text-2xl font-bold text-[#1e1632] cursor-pointer hover:text-[#fb4444] transition-colors" 
              style={{ fontFamily: "'OV Soge', sans-serif" }}
              onClick={() => setActiveView("Dashboard")}
            >
              Playground
            </h1>
          </div>
          
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* DYNAMIC GATEKEEPER BADGE */}
            <div className="hidden sm:flex items-center gap-2 bg-[#fb4444] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_10px_rgba(251,68,68,0.2)]">
              <User size={14} />
              <span>{userProfile.segmentText}</span>
            </div>

            {/* DYNAMIC USER PROFILE */}
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#1e1632]">{userProfile.fullName}</p>
                <p className="text-xs text-gray-500">{userProfile.isPremium ? "Premium Member" : "Free Member"}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-white font-bold text-lg">
                {/* Fallback avatar using their first initial */}
                {userProfile.firstName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* 2. DASHBOARD SCROLL AREA */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            
            {/* ========================================== */}
            {/* VIEW: DASHBOARD / OVERVIEW                 */}
            {/* ========================================== */}
            {activeView === "Dashboard" && (
              <>
                {/* VIBRANT APP-LIKE WELCOME BANNER */}
                <div className="relative w-full rounded-[24px] bg-gradient-to-r from-[#6b46c1] to-[#f472b6] p-8 sm:p-10 text-white shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-white/90 mb-2 font-medium">
                      <Sparkles size={18} />
                      {/* DYNAMIC WELCOME MESSAGE */}
                      <span>Welcome back, {userProfile.firstName}!</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "'OV Soge', sans-serif" }}>
                      Continue Your Journey
                    </h2>
                    <p className="text-white/80 max-w-xl mb-8 text-sm sm:text-base leading-relaxed font-['Inter',sans-serif]">
                      Curated learning experiences specifically designed for your age segment and growth path. You're making great progress!
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-white text-[#6b46c1] px-6 py-2.5 rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2">
                        Resume Learning <ChevronRight size={18} />
                      </button>
                      <button className="bg-white/20 text-white border border-white/30 px-6 py-2.5 rounded-full font-bold hover:bg-white/30 transition-colors flex items-center gap-2">
                        <span className="text-xl">🔥</span> 7 Day Streak!
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. GAMIFICATION OVERVIEW STATS */}
                <div className="flex flex-col gap-4 mt-6">
                  <h3 className="text-xl font-bold text-[#1e1632]" style={{ fontFamily: "'OV Soge', sans-serif" }}>Overview</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Stat Card 1: Courses */}
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-50 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Active Courses</p>
                        <p className="text-3xl font-bold text-[#1e1632]">4</p>
                        <p className="text-emerald-500 text-xs font-bold mt-2">+2 this month</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <BookOpen size={24} />
                      </div>
                    </div>

                    {/* Stat Card 2: Hours */}
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-50 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Hours Learned</p>
                        <p className="text-3xl font-bold text-[#1e1632]">127</p>
                        <p className="text-emerald-500 text-xs font-bold mt-2">+15% from last month</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                        <TrendingUp size={24} />
                      </div>
                    </div>

                    {/* Stat Card 3: Badges */}
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-50 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Achievements</p>
                        <p className="text-3xl font-bold text-[#1e1632]">23</p>
                        <p className="text-emerald-500 text-xs font-bold mt-2">+5 new badges</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                        <Award size={24} />
                      </div>
                    </div>

                    {/* Stat Card 4: Streaks */}
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-50 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Streak</p>
                        <p className="text-3xl font-bold text-[#1e1632]">7 Days</p>
                        <p className="text-emerald-500 text-xs font-bold mt-2">Personal best!</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                        <span className="text-2xl">🔥</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ========================================== */}
            {/* VIEW: MY COURSES                           */}
            {/* ========================================== */}
            {activeView === "My Courses" && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* 4. MY COURSES SECTION (3-FREE-VIDEOS PAYWALL) */}
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#1e1632]" style={{ fontFamily: "'OV Soge', sans-serif" }}>My Courses</h3>
                    <span className="text-sm font-bold text-gray-500 cursor-pointer hover:text-[#fb4444]">View All</span>
                  </div>

                  {/* Course Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    
                    {/* Course Card 1 */}
                    <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-all cursor-pointer">
                      <div className="relative h-[160px] w-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop" alt="React Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-[#fb4444] text-white px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                          <ListVideo size={12} />
                          3 VIDEOS FREE
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="text-[16px] font-bold text-[#1e1632] mb-1 line-clamp-2">Advanced React & TypeScript</h4>
                        <p className="text-xs text-gray-500 mb-4">Sarah Johnson</p>
                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-600">Progress</span>
                            <span className="text-xs font-bold text-[#1e1632]">67% Complete</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
                            <div className="bg-[#1e1632] h-1.5 rounded-full" style={{ width: '67%' }}></div>
                          </div>
                          <p className="text-[10px] text-gray-400 mb-4">16 of 24 lessons completed</p>
                          <button className="w-full bg-[#1e1632] hover:bg-[#2d245a] text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Course Card 2 */}
                    <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-all cursor-pointer">
                      <div className="relative h-[160px] w-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" alt="Data Science" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-[#fb4444] text-white px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                          <ListVideo size={12} />
                          3 VIDEOS FREE
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="text-[16px] font-bold text-[#1e1632] mb-1 line-clamp-2">Data Science Fundamentals</h4>
                        <p className="text-xs text-gray-500 mb-4">Dr. Michael Chen</p>
                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-600">Progress</span>
                            <span className="text-xs font-bold text-[#1e1632]">45% Complete</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
                            <div className="bg-[#1e1632] h-1.5 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <p className="text-[10px] text-gray-400 mb-4">14 of 32 lessons completed</p>
                          <button className="w-full bg-[#1e1632] hover:bg-[#2d245a] text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Course Card 3 */}
                    <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-all cursor-pointer">
                      <div className="relative h-[160px] w-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop" alt="Web Development" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-[#fb4444] text-white px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                          <ListVideo size={12} />
                          3 VIDEOS FREE
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="text-[16px] font-bold text-[#1e1632] mb-1 line-clamp-2">Full Stack Web Development</h4>
                        <p className="text-xs text-gray-500 mb-4">Alex Martinez</p>
                        <div className="mt-auto">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-600">Progress</span>
                            <span className="text-xs font-bold text-[#1e1632]">0% Complete</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
                            <div className="bg-[#1e1632] h-1.5 rounded-full" style={{ width: '0%' }}></div>
                          </div>
                          <p className="text-[10px] text-gray-400 mb-4">0 of 28 lessons completed</p>
                          <button className="w-full bg-[#fb4444] hover:bg-[#e03a3a] text-white py-2.5 rounded-xl text-sm font-bold transition-colors">
                            Start Course
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

             {/* ========================================== */}
            {/* VIEW: ORGANISE (TASKS)                     */}
            {/* ========================================== */}
            {activeView === "Tasks" && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-[#1e1632]" style={{ fontFamily: "'OV Soge', sans-serif" }}>My Tasks</h3>
                
                <div className="w-full max-w-2xl">
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex flex-col h-full">
                    <h4 className="text-[16px] font-bold text-[#1e1632] mb-4">Upcoming Tasks</h4>
                    <div className="flex flex-col gap-3">
                      {/* DYNAMIC INTERACTIVE TASKS */}
                      {tasks.map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${
                            task.completed 
                              ? "border-gray-100 opacity-60 bg-gray-50/50" 
                              : task.priority === "medium"
                              ? "border-orange-200 bg-orange-50/30 hover:bg-orange-50"
                              : "border-gray-100 hover:bg-gray-50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors ${
                            task.completed
                              ? "bg-[#fb4444] text-white"
                              : task.priority === "medium"
                              ? "border-2 border-orange-300 group-hover:border-orange-500"
                              : "border-2 border-gray-300 group-hover:border-[#fb4444]"
                          }`}>
                            {task.completed && <CheckSquare size={14} />}
                          </div>
                          <div className={`flex-1 transition-all ${task.completed ? "line-through text-gray-400" : ""}`}>
                            <p className="text-sm font-semibold text-[#1e1632]">{task.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                <Calendar size={10} /> {task.date}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                task.priority === "high" 
                                  ? "text-[#fb4444] bg-red-50" 
                                  : "text-orange-500 bg-orange-100"
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* VIEW: ORGANISE (CALENDAR)                  */}
            {/* ========================================== */}
            {activeView === "Calendar" && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-[#1e1632]" style={{ fontFamily: "'OV Soge', sans-serif" }}>My Calendar</h3>
                
                <div className="w-full max-w-[350px]">
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex flex-col h-full items-center">
                    <h4 className="text-[16px] font-bold text-[#1e1632] mb-4 self-start">May 2026</h4>
                    <div className="w-full mt-2">
                      <div className="flex justify-between items-center mb-6">
                        <ChevronLeft size={18} className="text-gray-400 cursor-pointer hover:text-black transition-colors" />
                        <span className="text-sm font-bold text-[#1e1632]">May 2026</span>
                        <ChevronRight size={18} className="text-gray-400 cursor-pointer hover:text-black transition-colors" />
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center text-xs mb-3 text-gray-400 font-medium">
                        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                      </div>
                      <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-sm font-medium text-[#1e1632]">
                        <div className="text-gray-300">26</div><div className="text-gray-300">27</div><div className="text-gray-300">28</div><div className="text-gray-300">29</div><div className="text-gray-300">30</div><div>1</div><div>2</div>
                        <div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
                        <div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div>
                        <div>17</div><div>18</div><div>19</div><div>20</div><div>21</div><div>22</div><div>23</div>
                        <div>24</div><div>25</div><div>26</div>
                        <div className="bg-[#1e1632] text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto shadow-md">27</div>
                        <div>28</div><div>29</div><div>30</div>
                        <div>31</div><div className="text-gray-300">1</div><div className="text-gray-300">2</div><div className="text-gray-300">3</div><div className="text-gray-300">4</div><div className="text-gray-300">5</div><div className="text-gray-300">6</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* VIEW: ORGANISE (NOTES)                     */}
            {/* ========================================== */}
            {activeView === "Notes" && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-[#1e1632]" style={{ fontFamily: "'OV Soge', sans-serif" }}>My Notes</h3>
                
                <div className="w-full max-w-2xl">
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex flex-col h-full">
                    <h4 className="text-[16px] font-bold text-[#1e1632] mb-4">Quick Notes</h4>
                    <div className="flex flex-col gap-3">
                      <div className="p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer bg-purple-50/30">
                        <p className="text-sm font-bold text-[#1e1632] mb-1">React Hooks Best Practices</p>
                        <p className="text-[11px] text-gray-500 font-medium">Updated 2 hours ago</p>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer">
                        <p className="text-sm font-bold text-[#1e1632] mb-1">Python Data Structures</p>
                        <p className="text-[11px] text-gray-500 font-medium">Updated yesterday</p>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-100 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer">
                        <p className="text-sm font-bold text-[#1e1632] mb-1">SQL Query Optimization</p>
                        <p className="text-[11px] text-gray-500 font-medium">Updated 3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
                        {/* ========================================== */}
            {/* VIEW: EVOLVE (WELLNESS )    */}
            {/* ========================================== */}
            {(activeView === "Wellness Hub" ) && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-[#1e1632]" style={{ fontFamily: "'OV Soge', sans-serif" }}>Evolve & Wellness</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* A. Learning Activity Chart Placeholder */}
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex flex-col h-full">
                    <h4 className="text-[16px] font-bold text-[#1e1632] mb-8">Learning Activity</h4>
                    <div className="relative w-full h-[180px] flex items-end justify-between pb-6 border-b border-gray-100">
                      
                      {/* Grid Lines */}
                      <div className="absolute top-0 w-full border-t border-dashed border-gray-200"></div>
                      <div className="absolute top-1/3 w-full border-t border-dashed border-gray-200"></div>
                      <div className="absolute top-2/3 w-full border-t border-dashed border-gray-200"></div>

                      {/* SVG Line connecting dots */}
                      <svg className="absolute inset-0 h-[calc(100%-24px)] w-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 500 150">
                        <path d="M 35 110 L 105 80 L 175 120 L 250 60 L 320 70 L 395 50 L 465 100" fill="none" stroke="#a855f7" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                      </svg>

                      {/* Data Points */}
                      <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mb-[45px] group-hover:scale-150 transition-transform"></div>
                        <span className="absolute bottom-[-24px] text-[10px] font-medium text-gray-400">Mon</span>
                      </div>
                      <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mb-[75px] group-hover:scale-150 transition-transform"></div>
                        <span className="absolute bottom-[-24px] text-[10px] font-medium text-gray-400">Tue</span>
                      </div>
                      <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mb-[35px] group-hover:scale-150 transition-transform"></div>
                        <span className="absolute bottom-[-24px] text-[10px] font-medium text-gray-400">Wed</span>
                      </div>
                      
                      {/* Active Highlighted Day */}
                      <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#fb4444] mb-[95px] scale-125 shadow-[0_0_10px_rgba(251,68,68,0.5)]"></div>
                        <span className="absolute bottom-[-24px] text-[10px] font-bold text-[#1e1632]">Thu</span>
                        {/* Interactive Tooltip */}
                        <div className="absolute -top-[55px] bg-white border border-gray-100 shadow-lg text-[10px] py-1.5 px-3 rounded-lg font-bold text-gray-700 whitespace-nowrap z-20">
                          Thu <br/><span className="text-[#fb4444]">hours: 5.2</span>
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mb-[85px] group-hover:scale-150 transition-transform"></div>
                        <span className="absolute bottom-[-24px] text-[10px] font-medium text-gray-400">Fri</span>
                      </div>
                      <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mb-[105px] group-hover:scale-150 transition-transform"></div>
                        <span className="absolute bottom-[-24px] text-[10px] font-medium text-gray-400">Sat</span>
                      </div>
                      <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mb-[55px] group-hover:scale-150 transition-transform"></div>
                        <span className="absolute bottom-[-24px] text-[10px] font-medium text-gray-400">Sun</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-500 mt-8">Total: 23.1 hours this week</p>
                  </div>

                  {/* B. Wellness Hub Timeline */}
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex flex-col h-full">
                    <h4 className="text-[16px] font-bold text-[#1e1632] mb-6">Wellness Hub</h4>
                    <div className="flex flex-col gap-6 border-l-2 border-gray-100 ml-2 pl-5 relative mt-2">

                      {/* Activity 1 */}
                      <div className="relative">
                        <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#fb4444] border-[3px] border-white shadow-sm box-content"></div>
                        <p className="text-sm font-bold text-[#1e1632]">Daily Reflection</p>
                        <p className="text-xs text-emerald-500 font-medium mt-0.5">Completed Today</p>
                      </div>

                      {/* Activity 2 */}
                      <div className="relative">
                        <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#fb4444] border-[3px] border-white shadow-sm box-content"></div>
                        <p className="text-sm font-bold text-[#1e1632]">Mindfulness Practice</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">5 min session</p>
                      </div>

                      {/* Activity 3 */}
                      <div className="relative">
                        <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#6b46c1] border-[3px] border-white shadow-sm box-content"></div>
                        <p className="text-sm font-bold text-[#1e1632]">Stress Management</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">Scheduled</p>
                      </div>

                      {/* Activity 4 */}
                      <div className="relative opacity-50">
                        <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-gray-300 border-[3px] border-white shadow-sm box-content"></div>
                        <p className="text-sm font-bold text-[#1e1632]">Growth Mindset</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">Coming Up</p>
                      </div>
                    </div>
                  </div>

                  {/* C. Achievements Grid */}
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex flex-col h-full lg:col-span-2">
                    <h4 className="text-[16px] font-bold text-[#1e1632] mb-4">Achievements</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-red-200 transition-colors cursor-pointer group">
                        <Award className="text-[#fb4444] mb-3 group-hover:scale-110 transition-transform" size={32} />
                        <p className="text-sm font-bold text-[#1e1632] text-center">Course Master</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-orange-200 transition-colors cursor-pointer group">
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">🔥</span>
                        <p className="text-sm font-bold text-[#1e1632] text-center">7 Day Streak</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-emerald-200 transition-colors cursor-pointer group">
                        <TrendingUp className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                        <p className="text-sm font-bold text-[#1e1632] text-center">Rising Star</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-blue-200 transition-colors cursor-pointer group">
                        <Target className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                        <p className="text-sm font-bold text-[#1e1632] text-center">Goal Crusher</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

                        {/* ========================================== */}
            {/* VIEW: EVOLVE (MENTAL HEALTH)               */}
            {/* ========================================== */}
            {activeView === "Mental Health" && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-[#1e1632]" style={{ fontFamily: "'OV Soge', sans-serif" }}>Mental Health & Support</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* A. Mood Check-in (Fully Interactive) */}
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex flex-col">
                    <h4 className="text-[16px] font-bold text-[#1e1632] mb-4">How are you feeling today?</h4>
                    <div className="flex justify-between items-center gap-2 mb-6">
                      
                      {/* Stressed Button */}
                      <button 
                        onClick={() => setSelectedMood("Stressed")}
                        className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-colors group ${
                          selectedMood === "Stressed" ? "border-purple-400 bg-purple-50 shadow-sm" : "border-gray-100 hover:bg-purple-50"
                        }`}
                      >
                        <span className="text-3xl group-hover:scale-110 transition-transform">😫</span>
                        <span className={`text-xs mt-1 ${selectedMood === "Stressed" ? "font-bold text-purple-600" : "font-medium text-gray-500"}`}>Stressed</span>
                      </button>

                      {/* Okay Button */}
                      <button 
                        onClick={() => setSelectedMood("Okay")}
                        className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-colors group ${
                          selectedMood === "Okay" ? "border-orange-400 bg-orange-50 shadow-sm" : "border-gray-100 hover:bg-orange-50"
                        }`}
                      >
                        <span className="text-3xl group-hover:scale-110 transition-transform">😐</span>
                        <span className={`text-xs mt-1 ${selectedMood === "Okay" ? "font-bold text-orange-600" : "font-medium text-gray-500"}`}>Okay</span>
                      </button>

                      {/* Good Button */}
                      <button 
                        onClick={() => setSelectedMood("Good")}
                        className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-colors group ${
                          selectedMood === "Good" ? "border-[#fb4444] bg-red-50 shadow-sm" : "border-gray-100 hover:bg-red-50"
                        }`}
                      >
                        <span className="text-3xl group-hover:scale-110 transition-transform">😊</span>
                        <span className={`text-xs mt-1 ${selectedMood === "Good" ? "font-bold text-[#fb4444]" : "font-medium text-gray-500"}`}>Good</span>
                      </button>

                      {/* Great Button */}
                      <button 
                        onClick={() => setSelectedMood("Great")}
                        className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-colors group ${
                          selectedMood === "Great" ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-gray-100 hover:bg-emerald-50"
                        }`}
                      >
                        <span className="text-3xl group-hover:scale-110 transition-transform">🤩</span>
                        <span className={`text-xs mt-1 ${selectedMood === "Great" ? "font-bold text-emerald-600" : "font-medium text-gray-500"}`}>Great</span>
                      </button>

                    </div>
                    
                    {/* DYNAMIC AI Insight Box */}
                    <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 mt-auto">
                      <p className="text-sm font-semibold text-[#1e1632] mb-1 flex items-center gap-2">
                        <Brain size={16} className="text-purple-500"/> AI Insight
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {selectedMood === "Stressed" && "Take a deep breath. It looks like you're feeling overwhelmed. Consider trying the Box Breathing exercise below to recenter yourself."}
                        {selectedMood === "Okay" && "You're doing alright! A quick Mindfulness Practice could help elevate your focus and energy for the rest of the day."}
                        {selectedMood === "Good" && "Your mood has been consistently \"Good\"! Keeping up with your daily reflections is having a positive impact on your stress levels."}
                        {selectedMood === "Great" && "Fantastic! You're in a great headspace to tackle challenging new concepts today. Keep that momentum going!"}
                      </p>
                    </div>
                  </div>

                  {/* B. Recommended Exercises */}
                  <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex flex-col">
                    <h4 className="text-[16px] font-bold text-[#1e1632] mb-4">Quick Relief Exercises</h4>
                    <div className="flex flex-col gap-3">
                      
                      {/* Exercise 1 */}
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Wind size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1e1632]">Box Breathing</p>
                            <p className="text-xs text-gray-500">Reduce anxiety • 3 mins</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>

                      {/* Exercise 2 */}
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Smile size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1e1632]">Guided Meditation</p>
                            <p className="text-xs text-gray-500">Regain focus • 10 mins</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                      </div>

                      {/* Exercise 3 */}
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Heart size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1e1632]">Gratitude Journal</p>
                            <p className="text-xs text-gray-500">Evening reflection • 5 mins</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )}


            {/* ========================================== */}
            {/* VIEW: FALLBACK FOR UNUSED SIDEBAR BUTTONS  */}
            {/* ========================================== */}
            {![
              "Dashboard", "Overview", "My Courses", "Tasks", "Calendar", "Notes", "Wellness Hub", "Mental Health"
            ].includes(activeView) && (
              <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="h-20 w-20 bg-purple-100 text-[#6b46c1] rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Sparkles size={36} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1e1632] mb-3" style={{ fontFamily: "'OV Soge', sans-serif" }}>
                  {activeView}
                </h3>
                <p className="text-gray-500 max-w-md text-sm sm:text-base leading-relaxed">
                  We are currently curating and compiling the best age-specific resources for this section. Check back soon for new updates!
                </p>
              </div>
            )}

            {/* new items to be added here */}
           
          </div>
        </main>


        </SidebarInset>

          
          
        </div>
      </SidebarProvider>
  );
}