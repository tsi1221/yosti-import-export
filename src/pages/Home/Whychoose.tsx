import React, { useState } from 'react';
import { PlusOutlined, MinusOutlined, CheckCircleFilled } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const PRIMARY_BLUE = '#0F3952';
const ACCENT_YELLOW = '#FFC300';

interface Feature {
  id: number;
  title: string;
  description: string;
}

const features: Feature[] = [
  { id: 1, title: 'End-to-End Support', description: 'From visa invitations to final delivery, we handle every step of the trade process, eliminating your logistical headaches and saving you time.' },
  { id: 2, title: '75+ Trusted Factories', description: 'We partner exclusively with a verified network of reliable manufacturers, ensuring you receive superior quality products and highly competitive ex-factory pricing.' },
  { id: 3, title: 'Licensed & Transparent', description: 'As a fully registered and legally compliant entity in China, all our operations are transparent, giving you peace of mind and security.' },
  { id: 4, title: 'African-Owned Insight', description: 'Being an African-owned business operating in China, we offer unique cultural understanding and business perspective, tailored to your specific market needs.' },
  { id: 5, title: 'Multilingual Team', description: 'Our team is fluent in English, Amharic, and Chinese, ensuring flawless communication and negotiation without reliance on third-party interpreters.' },
  { id: 6, title: 'On-the-Ground Experts', description: 'With two active offices (Shanghai & Yiwu), we provide local presence for quality control, factory visits, and immediate issue resolution.' },
  { id: 7, title: 'Secure Payment Handling', description: 'All payments are handled securely through verified company bank accounts, protecting your investment from fraudulent risks.' },
  { id: 8, title: 'After-Sales Commitment', description: 'Our commitment doesn\'t end at shipping; our team supports you with documentation and troubleshooting until your order is successfully delivered.' },
];

const WhyChoose: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const toggleAccordion = (id: number) => setExpandedId(expandedId === id ? null : id);

  const firstColumn = features.slice(0, 4);
  const secondColumn = features.slice(4, 8);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const accordionVariants = {
    collapsed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    expanded: { opacity: 1, height: 'auto', transition: { duration: 0.5 } },
  };

  return (
    <section className="relative py-6 sm:py-16 bg-white overflow-hidden">

      {/* Background Shape */}
      <div
        className="absolute top-0 left-0 w-full h-[110px] sm:h-[230px] rounded-b-[90px] sm:rounded-b-full opacity-90 z-0"
        style={{ backgroundColor: PRIMARY_BLUE }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {/* Header */}
        <motion.div className="text-center mb-6 sm:mb-10 mt-0" variants={itemVariants}>
          <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: ACCENT_YELLOW }}>
            Why Choose Us?
          </h2>
          <p className="hidden sm:block mt-4 max-w-xl mx-auto text-xl font-medium px-2"
             style={{ color: ACCENT_YELLOW }}>
            We offer more than sourcing—providing hands-on support, trusted factory access,
            and seamless coordination from start to finish so your business grows confidently.
          </p>
          <p className="block sm:hidden mt-2 max-w-md mx-auto text-sm font-medium px-2"
             style={{ color: ACCENT_YELLOW }}>
            We offer more than sourcing—providing hands-on support and trusted factory access.
          </p>
        </motion.div>

        {/* Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {[firstColumn, secondColumn].map((column, colIndex) => (
            <motion.div key={colIndex} className="space-y-4" variants={itemVariants}>
              {column.map((feature) => (
                <motion.div
                  key={feature.id}
                  className="border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <button
                    className="flex justify-between items-center w-full p-4 sm:p-5 text-left bg-gray-50 hover:bg-gray-100 transition duration-150"
                    onClick={() => toggleAccordion(feature.id)}
                  >
                    <div className="flex items-center">
                      <div className="bg-white p-2 rounded-full mr-3 sm:mr-4 shadow-md flex items-center justify-center">
                        <CheckCircleFilled style={{ fontSize: '20px', color: ACCENT_YELLOW }} />
                      </div>
                      <span className="text-base sm:text-lg font-semibold" style={{ color: PRIMARY_BLUE }}>
                        {feature.title}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      {expandedId === feature.id ? <MinusOutlined style={{ fontSize: '16px' }} /> : <PlusOutlined style={{ fontSize: '16px' }} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedId === feature.id && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={accordionVariants}
                        className="bg-white px-4 sm:px-5"
                      >
                        <p className="pt-2 text-sm sm:text-base border-t border-dashed border-gray-200 leading-relaxed"
                           style={{ color: PRIMARY_BLUE }}>
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default WhyChoose;
