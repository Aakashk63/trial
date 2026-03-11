
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../contexts/AppContext';
import Card from '../components/ui/Card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

const AnalyticsPage: React.FC = () => {
    const { messages } = useAppContext();

    const analyticsData = useMemo(() => {
        if (messages.length === 0) {
            return {
                intentDistribution: [],
                routingDistribution: [],
                averageConfidence: 0,
            };
        }

        const intentCounts = messages.reduce((acc, msg) => {
            acc[msg.intent] = (acc[msg.intent] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const intentDistribution = Object.entries(intentCounts).map(([name, value]) => ({ name, value }));
        
        const routingCounts = messages.reduce((acc, msg) => {
            acc[msg.workflow_action] = (acc[msg.workflow_action] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const routingDistribution = Object.entries(routingCounts).map(([name, value]) => ({ name, count: value }));

        const totalConfidence = messages.reduce((sum, msg) => sum + msg.confidence, 0);
        const averageConfidence = totalConfidence / messages.length;

        return { intentDistribution, routingDistribution, averageConfidence };
    }, [messages]);

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
        if (percent * 100 < 5) return null;
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

    return (
        <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-semibold">Overall Confidence</h3>
                <p className="mt-1 text-3xl font-semibold">{analyticsData.averageConfidence.toFixed(1)}%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average confidence score across all processed messages.</p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Intent Distribution</h3>
                    {messages.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={analyticsData.intentDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={110}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {analyticsData.intentDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-400 dark:text-gray-500">No data available</div>
                    )}
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-4">Routing Destinations</h3>
                     {messages.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={analyticsData.routingDistribution}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="Messages" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-400 dark:text-gray-500">No data available</div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsPage;
