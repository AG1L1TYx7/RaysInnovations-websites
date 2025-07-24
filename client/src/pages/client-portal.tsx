import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  budget: string;
  spent: string;
  startDate: string;
  endDate: string;
  estimatedHours: number;
  actualHours: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
}

interface TimeEntry {
  id: number;
  description: string;
  hours: number;
  date: string;
  taskTitle?: string;
}

const getStatusColor = (status: string) => {
  const colors = {
    'planning': 'bg-yellow-100 text-yellow-800',
    'in_progress': 'bg-blue-100 text-blue-800',
    'review': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800',
    'on_hold': 'bg-gray-100 text-gray-800',
    'todo': 'bg-gray-100 text-gray-800',
    'overdue': 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getPriorityColor = (priority: string) => {
  const colors = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'urgent': 'bg-red-100 text-red-800'
  };
  return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default function ClientPortal() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentUser] = useState({ id: 1, name: "John Doe", company: "Example Corp" }); // Mock current user
  const { toast } = useToast();

  // Fetch real data from API
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: async () => {
      const response = await fetch(`/api/projects?clientId=${currentUser.id}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    }
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['/api/tasks'],
    queryFn: async () => {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.json();
    }
  });

  const { data: timeEntries = [], isLoading: timeLoading } = useQuery({
    queryKey: ['/api/time-entries'],
    queryFn: async () => {
      const response = await fetch(`/api/time-entries?userId=${currentUser.id}`);
      if (!response.ok) throw new Error('Failed to fetch time entries');
      return response.json();
    }
  });

  if (projectsLoading || tasksLoading || timeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-24 pb-16 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg text-gray-600">Loading your projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Client Portal</h1>
              <p className="text-xl text-gray-600">Track your projects and collaborate with our team</p>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{currentUser.name}</p>
                <p className="text-sm text-gray-600">CEO, {currentUser.company}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <i className="fas fa-project-diagram text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <i className="fas fa-dollar-sign text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${projects.reduce((sum, p) => sum + (parseFloat(p.budget || '0')), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
              <i className="fas fa-clock text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.reduce((sum, p) => sum + (p.actualHours || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">This month: 128hrs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <i className="fas fa-chart-line text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="time">Time Tracking</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{project.name}</CardTitle>
                          <CardDescription className="mt-2">{project.description}</CardDescription>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(project.priority)}>
                            {project.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} />
                        </div>
                        
                        {/* Budget */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Budget</p>
                            <p className="font-semibold">${parseFloat(project.budget).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Spent</p>
                            <p className="font-semibold">${parseFloat(project.spent).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {/* Timeline */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Start Date</p>
                            <p className="font-semibold">
                              {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">End Date</p>
                            <p className="font-semibold">
                              {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Hours */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Estimated Hours</p>
                            <p className="font-semibold">{project.estimatedHours}h</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Actual Hours</p>
                            <p className="font-semibold">{project.actualHours}h</p>
                          </div>
                        </div>
                        
                        <Button className="w-full" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <CardDescription>{task.description}</CardDescription>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Due Date</p>
                          <p className="font-semibold">
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Estimated</p>
                          <p className="font-semibold">{task.estimatedHours}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Actual</p>
                          <p className="font-semibold">{task.actualHours}h</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Time Tracking Tab */}
            <TabsContent value="time" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Time Entries</CardTitle>
                  <CardDescription>Track time spent on your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{entry.description}</p>
                          <p className="text-xs text-gray-500">
                            {entry.date ? new Date(entry.date).toLocaleDateString() : 'No date'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{entry.hours}h</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Files Tab */}
            <TabsContent value="files" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Files</CardTitle>
                  <CardDescription>Download project deliverables and documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <i className="fas fa-folder-open text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">No files uploaded yet</p>
                    <Button variant="outline">
                      <i className="fas fa-upload mr-2" />
                      Upload File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}