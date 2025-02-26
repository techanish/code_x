import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Sparkles, Users, BookOpen, Trophy } from 'lucide-react';

const generateRandomData = () => {
  const skills = ['Python', 'Data Science', 'ML', 'Web Dev', 'Cloud', 'DevOps'];
  return skills.map((name) => ({
    name,
    value: Math.floor(Math.random() * 40) + 60, // Random value between 60-100
  }));
};

const generateTimeData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month) => ({
    name: month,
    courses: Math.floor(Math.random() * 50) + 50,
    students: Math.floor(Math.random() * 500) + 500,
  }));
};

const DashboardMetrics = () => {
  const [skillsData, setSkillsData] = useState(generateRandomData());
  const [timeData, setTimeData] = useState(generateTimeData());
  const [metrics, setMetrics] = useState([
    {
      title: 'Courses Analyzed',
      value: '124',
      icon: BookOpen,
      change: '+12%',
    },
    {
      title: 'Active Students',
      value: '1,234',
      icon: Users,
      change: '+5%',
    },
    {
      title: 'Skills Mapped',
      value: '456',
      icon: Sparkles,
      change: '+8%',
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSkillsData(generateRandomData());
      setTimeData(generateTimeData());
      
      // Update metrics with random changes
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          change: `+${Math.floor(Math.random() * 15)}%`,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-xl p-6 hover:ring-1 hover:ring-primary/50 transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
              <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
              <p className="text-sm text-emerald-400 mt-1">{metric.change} from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <metric.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Skills Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 col-span-full"
      >
        <h3 className="text-lg font-semibold mb-4">Top Skills in Demand</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillsData}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar
                dataKey="value"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Growth Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 col-span-full"
      >
        <h3 className="text-lg font-semibold mb-4">Growth Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeData}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="courses"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardMetrics;