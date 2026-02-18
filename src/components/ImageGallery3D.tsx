import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import MouseParallaxImage from './MouseParallaxImage';

interface ImageGallery3DProps {
  images: string[];
  title: string;
}

const ImageGallery3D = ({ images, title }: ImageGallery3DProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-primary mb-3">PROJECT GALLERY</h4>

      {/* Main 3D carousel view */}
      <div className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden" style={{ perspective: '1000px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ rotateY: 60, scale: 0.8, opacity: 0, x: 100 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1, x: 0 }}
            exit={{ rotateY: -60, scale: 0.8, opacity: 0, x: -100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="absolute inset-0 cursor-zoom-in"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => setIsLightboxOpen(true)}
          >
            <MouseParallaxImage
              src={images[activeIndex]}
              alt={`${title} screenshot ${activeIndex + 1}`}
              className="w-full h-full rounded-2xl"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-colors"
          whileHover={{ scale: 1.15, x: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-colors"
          whileHover={{ scale: 1.15, x: 2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Counter badge */}
        <motion.div
          className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm text-xs font-medium"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {activeIndex + 1} / {images.length}
        </motion.div>
      </div>

      {/* 3D Thumbnail strip */}
      <div className="flex gap-3 justify-center" style={{ perspective: '600px' }}>
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === activeIndex ? 'border-primary' : 'border-transparent'
              }`}
            initial={{ opacity: 0, rotateX: 30, y: 20 }}
            animate={{
              opacity: 1,
              rotateX: 0,
              y: 0,
              scale: i === activeIndex ? 1.1 : 1,
              z: i === activeIndex ? 30 : 0,
            }}
            transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 150 }}
            whileHover={{ scale: 1.15, rotateY: 8, y: -4 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            {/* Active glow */}
            {i === activeIndex && (
              <motion.div
                className="absolute inset-0 bg-primary/10"
                layoutId="activeThumb"
                transition={{ type: 'spring', stiffness: 200 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[activeIndex]}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-md"
              />

              {/* Lightbox Navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-2 right-2 md:top-4 md:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                {activeIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery3D;
