export interface UseImageLoaderOptions {
  src: string;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  placeholder?: string;
  fallback?: string;
}
