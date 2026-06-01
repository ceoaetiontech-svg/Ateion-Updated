import React, { useEffect, useState } from "react";
import { Edit2, Trash2, MoreVertical, Eye, TrendingUp } from "lucide-react";

interface Course {
  id: number;
  title: string;
  category: string;
  price: string;
  status: string;
  date: string;
}

export default function CourseListView() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Load courses from mock localStorage
    const savedCourses = JSON.parse(
      localStorage.getItem("admin_courses") || "[]",
    );
    // Provide some dummy data if empty
    if (savedCourses.length === 0) {
      const dummy = [
        {
          id: 1,
          title: "Introduction to Artificial Intelligence",
          category: "technology",
          price: "0",
          status: "Published",
          date: "2025-01-15",
        },
        {
          id: 2,
          title: "Advanced UX Design Principles",
          category: "design",
          price: "49",
          status: "Draft",
          date: "2025-02-28",
        },
      ];
      setCourses(dummy);
      localStorage.setItem("admin_courses", JSON.stringify(dummy));
    } else {
      setCourses(savedCourses);
    }
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const updated = courses.filter((c) => c.id !== id);
      setCourses(updated);
      localStorage.setItem("admin_courses", JSON.stringify(updated));
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">
            Manage Courses
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            View, edit, and analyze your ecosystem courses.
          </p>
        </div>
      </div>

      <div className="clay-card overflow-hidden bg-[var(--color-background-secondary)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-light)] text-[var(--color-text-tertiary)] text-sm">
                <th className="p-6 font-semibold">Course Title</th>
                <th className="p-6 font-semibold">Category</th>
                <th className="p-6 font-semibold">Price</th>
                <th className="p-6 font-semibold">Status</th>
                <th className="p-6 font-semibold">Date</th>
                <th className="p-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-[var(--color-background-primary)] transition-colors group"
                >
                  <td className="p-6">
                    <p className="font-bold text-[var(--color-text-primary)]">
                      {course.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      ID: #{course.id}
                    </p>
                  </td>
                  <td className="p-6">
                    <span className="capitalize px-3 py-1 bg-[var(--color-background-tertiary)] rounded-full text-xs font-semibold text-[var(--color-text-secondary)]">
                      {course.category}
                    </span>
                  </td>
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">
                    {course.price === "0" || !course.price
                      ? "Free"
                      : `$${course.price}`}
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.status === "Published"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="p-6 text-sm text-[var(--color-text-secondary)]">
                    {course.date}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 hover:bg-[var(--color-background-tertiary)] rounded-full text-[var(--color-text-secondary)] hover:text-blue-500 transition-colors"
                        title="View Analytics"
                      >
                        <TrendingUp size={18} />
                      </button>
                      <button
                        className="p-2 hover:bg-[var(--color-background-tertiary)] rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                        title="Edit Course"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 hover:bg-red-500/10 rounded-full text-[var(--color-text-secondary)] hover:text-red-500 transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-12 text-center text-[var(--color-text-tertiary)]"
                  >
                    No courses found. Go to "Upload Course" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
