import { Layout } from "@/components/layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, User, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  category: string | null;
  author: string;
  read_time: string;
  published_at: string | null;
  created_at: string;
}

// Simple markdown-like rendering (basic support)
function renderContent(content: string | null) {
  if (!content) return null;
  
  // Split by lines and process
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  
  lines.forEach((line, index) => {
    const key = `line-${index}`;
    
    // Images: ![alt](url)
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      elements.push(
        <figure key={key} className="my-8">
          <img 
            src={src} 
            alt={alt || ''} 
            className="w-full rounded-xl shadow-lg"
          />
          {alt && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      return;
    }
    
    // Headers
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key} className="text-xl font-bold text-foreground mt-8 mb-4">{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key} className="text-2xl font-bold text-foreground mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={key} className="text-3xl font-bold text-foreground mt-10 mb-4">{line.slice(2)}</h1>);
    } 
    // Horizontal rule
    else if (line.trim() === '---') {
      elements.push(<hr key={key} className="my-8 border-border" />);
    }
    // Blockquotes
    else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={key} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
          {line.slice(2)}
        </blockquote>
      );
    }
    // Lists
    else if (line.startsWith('- ')) {
      elements.push(<li key={key} className="ml-6 text-muted-foreground">{line.slice(2)}</li>);
    }
    // Empty lines
    else if (line.trim() === '') {
      elements.push(<br key={key} />);
    }
    // Regular paragraphs
    else {
      // Process bold, italic, and inline images
      let processedLine = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="inline-block max-h-64 rounded my-2" />');
      
      elements.push(
        <p 
          key={key} 
          className="text-muted-foreground leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    }
  });
  
  return elements;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await (supabase as any)
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (fetchError || !data) {
          console.error('Post not found:', fetchError);
          setError(true);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Artículo no encontrado
            </h1>
            <p className="text-muted-foreground mb-6">
              El artículo que buscás no existe o no está disponible.
            </p>
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver al Blog
            </button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero with image */}
      <section className="relative">
        {post.image ? (
          <>
            {/* Featured Image with overlay */}
            <div className="h-[60vh] min-h-[500px] relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              
              {/* Content positioned over the image */}
              <div className="absolute inset-0 flex items-end">
                <div className="container pb-12">
                  <motion.div 
                    className="max-w-3xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Link 
                      to="/blog" 
                      className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Blog
                    </Link>
                    
                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4 ml-4">
                        {post.category}
                      </span>
                    )}
                    
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                      {post.title}
                    </h1>
                    
                    <div className="flex items-center gap-6 text-white/90">
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {post.read_time}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // No image - simple header
          <div className="bg-primary py-16">
            <div className="container">
              <motion.div 
                className="max-w-3xl mx-auto text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Blog
                </Link>
                
                {post.category && (
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4 ml-4">
                    {post.category}
                  </span>
                )}
                
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-center gap-6 text-white/90">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.read_time}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container">
          <motion.article 
            className="max-w-3xl mx-auto prose prose-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Excerpt as intro */}
            {post.excerpt && (
              <p className="text-xl text-foreground font-medium leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}
            
            {/* Main content */}
            <div className="mt-8">
              {renderContent(post.content)}
            </div>
          </motion.article>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            ¿Querés conocer más destinos?
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Explorá nuestros paquetes de viaje y encontrá tu próxima aventura
          </p>
          <Link
            to="/paquetes/caribe"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold transition-all"
          >
            Ver Paquetes
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
