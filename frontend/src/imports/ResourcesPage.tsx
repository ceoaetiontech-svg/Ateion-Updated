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
} from "lucide-react";

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
              <SidebarHeader className="px-4 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FB4444]">
                    <Rocket size={24} />
                  </div>

                  <div>
                    <h1 className="font-bold text-xl">Ateion</h1>
                    <p className="text-[10px] tracking-[3px] uppercase text-white/70">
                      Playground
                    </p>
                  </div>
                </div>
              </SidebarHeader>

              {/* MENU */}
              <SidebarContent className="px-2">
                {navigationSections.map((section) => (
                    <Collapsible
                        key={section.title}
                        defaultOpen
                        className="group/collapsible"
                    >
                      <SidebarGroup>
                        <SidebarGroupLabel asChild>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="text-white hover:bg-white/10">
                              <section.icon size={18} />

                              <span>{section.title}</span>

                              <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent>
                          <SidebarGroupContent>
                            <SidebarMenu>
                              {section.items.map((item) => (
                                  <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className="text-white/80 hover:bg-white/10 hover:text-white">
                                      <item.icon size={16} />
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

          {/* BLANK PAGE CONTENT */}
          <main className="flex-1 bg-[#F7F3EB]" />
        </div>
      </SidebarProvider>
  );
}