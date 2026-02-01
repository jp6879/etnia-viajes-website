import { Layout } from "@/components/layout";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, User, Loader2 } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";
import etniaLogoIcon from "@/assets/etnia-logo-icon-green.png";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// ==========================================
// BLOG POST TYPE
// ==========================================
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  image: string | null;
  category: string | null;
  author: string;
  read_time: string;
  published_at: string | null;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await (supabase as any)
          .from('blog_posts')
          .select('id, slug, title, excerpt, image, category, author, read_time, published_at, created_at')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Get unique categories from posts
  const categories = ["Todos", ...Array.from(new Set(posts.map(post => post.category).filter(Boolean)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === "Todos" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      {/* Hero Section with Logo */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-background opacity-50" 
        style={{
                backgroundImage: 'url(/header-blog.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
              }}>
        </div>
        <div className="container relative z-10">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img 
              src={etniaLogoIcon}
              alt="Etnia Viajes"
              className="h-48 w-auto rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Blog de Viajes
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Inspiración, consejos y guías para tu próxima aventura. Descubrí destinos increíbles y planificá el viaje de tus sueños.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border bg-background sticky top-16 z-30">
        <div className="container">
          <ScrollAnimation variant="fadeIn">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category as string)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {filteredPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <motion.article 
                    className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={post.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.published_at || post.created_at)}
                            </span>
                          </div>
                          <span>{post.read_time}</span>
                        </div>
                        
                        {/* Read More */}
                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                            Leer más <ArrowRight className="ml-1 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {!loading && filteredPosts.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md mx-auto">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Próximamente
                </h3>
                <p className="text-muted-foreground">
                  Estamos preparando contenido increíble para vos. ¡Volvé pronto!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <ScrollAnimation variant="fadeUp">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Suscribite a Nuestro Newsletter
              </h2>
              <p className="text-muted-foreground mb-6">
                Recibí las últimas novedades, ofertas exclusivas y consejos de viaje directamente en tu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <motion.button
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suscribirse
                </motion.button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
