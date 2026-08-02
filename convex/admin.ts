import { query } from "./_generated/server";
import { assertAdmin } from "./helpers";

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);

    const [blogs, projects, products, orders] = await Promise.all([
      ctx.db.query("blogs").collect(),
      ctx.db.query("projects").collect(),
      ctx.db.query("products").collect(),
      ctx.db.query("orders").order("desc").collect(),
    ]);

    const publishedBlogs = blogs.filter((b) => b.published).length;
    const publishedProducts = products.filter((p) => p.published).length;

    const paidOrders = orders.filter((o) => o.status === "paid");
    const pendingOrders = orders.filter((o) => o.status === "pending");
    const failedOrders = orders.filter((o) => o.status === "failed");

    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const productById = new Map(products.map((p) => [p._id, p]));

    // Top sellers by revenue (each order currently holds exactly one product)
    const salesByProduct = new Map<
      string,
      { title: string; revenue: number; sales: number }
    >();
    for (const order of paidOrders) {
      for (const productId of order.productIds) {
        const title = productById.get(productId)?.title ?? "Deleted product";
        const existing = salesByProduct.get(productId) ?? {
          title,
          revenue: 0,
          sales: 0,
        };
        existing.revenue += order.totalAmount;
        existing.sales += 1;
        salesByProduct.set(productId, existing);
      }
    }
    const topProducts = Array.from(salesByProduct.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const recentOrders = orders.slice(0, 8).map((order) => ({
      id: order._id,
      createdAt: order._creationTime,
      buyerEmail: order.buyerEmail,
      totalAmount: order.totalAmount,
      status: order.status,
      products: order.productIds.map(
        (id) => productById.get(id)?.title ?? "Deleted product"
      ),
    }));

    const recentBlogs = [...blogs]
      .sort((a, b) => b._creationTime - a._creationTime)
      .slice(0, 5)
      .map((b) => ({
        id: b._id,
        title: b.title,
        published: b.published,
        likesCount: b.likesCount ?? 0,
        commentsCount: b.commentsCount ?? 0,
        createdAt: b._creationTime,
      }));

    const recentProjects = [...projects]
      .sort((a, b) => b._creationTime - a._creationTime)
      .slice(0, 5)
      .map((p) => ({
        id: p._id,
        name: p.name,
        projectType: p.projectType,
        isFeatured: p.isFeatured ?? false,
        createdAt: p._creationTime,
      }));

    return {
      blogs: {
        total: blogs.length,
        published: publishedBlogs,
        drafts: blogs.length - publishedBlogs,
      },
      projects: {
        total: projects.length,
        featured: projects.filter((p) => p.isFeatured).length,
      },
      products: {
        total: products.length,
        published: publishedProducts,
        drafts: products.length - publishedProducts,
      },
      sales: {
        totalRevenue,
        paidCount: paidOrders.length,
        pendingCount: pendingOrders.length,
        failedCount: failedOrders.length,
      },
      topProducts,
      recentOrders,
      recentBlogs,
      recentProjects,
    };
  },
});
