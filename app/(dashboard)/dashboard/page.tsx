"use client";

import AppShell from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import {
  DollarSign,
  ShoppingBag,
  BookText,
  FolderKanban,
  Package,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardContent className="p-5 flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
};

export default function DashboardPage() {
  const stats = useQuery(api.admin.getDashboardStats, {});

  if (stats instanceof Error) {
    return (
      <AppShell>
        <p className="text-red-500 text-center py-20">{stats.message}</p>
      </AppShell>
    );
  }

  if (stats === undefined) {
    return (
      <AppShell>
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="w-full space-y-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Revenue"
            value={`$${stats.sales.totalRevenue.toFixed(2)}`}
            sub={`${stats.sales.paidCount} paid order${stats.sales.paidCount !== 1 ? "s" : ""}`}
            icon={DollarSign}
          />
          <StatCard
            label="Products"
            value={stats.products.total}
            sub={`${stats.products.published} published · ${stats.products.drafts} draft`}
            icon={Package}
          />
          <StatCard
            label="Blogs"
            value={stats.blogs.total}
            sub={`${stats.blogs.published} published · ${stats.blogs.drafts} draft`}
            icon={BookText}
          />
          <StatCard
            label="Projects"
            value={stats.projects.total}
            sub={`${stats.projects.featured} featured`}
            icon={FolderKanban}
          />
        </div>

        {/* Order status breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Paid Orders"
            value={stats.sales.paidCount}
            icon={ShoppingBag}
          />
          <StatCard
            label="Pending Orders"
            value={stats.sales.pendingCount}
            icon={ShoppingBag}
          />
          <StatCard
            label="Failed Orders"
            value={stats.sales.failedCount}
            icon={ShoppingBag}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShoppingBag className="h-4 w-4" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No orders yet.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="text-xs truncate max-w-[120px]">
                          {order.buyerEmail}
                        </TableCell>
                        <TableCell className="text-xs truncate max-w-[120px]">
                          {order.products.join(", ")}
                        </TableCell>
                        <TableCell className="text-xs">
                          ${order.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusVariant[order.status] ?? "secondary"}
                            className="text-xs capitalize"
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Top products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Top Products by Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No sales yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.topProducts.map((product, i) => (
                    <div key={product.title} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground w-4">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.sales} sale{product.sales !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">
                        ${product.revenue.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent blogs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookText className="h-4 w-4" />
                Recent Blogs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentBlogs.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No blogs yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {stats.recentBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {blog.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(blog.createdAt), "MMM d, yyyy")} ·{" "}
                          {blog.likesCount} likes · {blog.commentsCount} comments
                        </p>
                      </div>
                      <Badge
                        variant={blog.published ? "default" : "secondary"}
                        className="text-xs shrink-0"
                      >
                        {blog.published ? "Live" : "Draft"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
              <Link
                href="/blogs"
                className="block text-xs text-primary hover:underline mt-4"
              >
                View all blogs →
              </Link>
            </CardContent>
          </Card>

          {/* Recent projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FolderKanban className="h-4 w-4" />
                Recent Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentProjects.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No projects yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {stats.recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {project.projectType} ·{" "}
                          {format(new Date(project.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                      {project.isFeatured && (
                        <Badge variant="default" className="text-xs shrink-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <Link
                href="/projects"
                className="block text-xs text-primary hover:underline mt-4"
              >
                View all projects →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
