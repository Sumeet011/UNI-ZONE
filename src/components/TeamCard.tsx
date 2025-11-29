import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Instagram, Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  linkedin?: string;
  image?: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const initials = member.name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="perspective-2000 h-[300px] md:h-[350px] lg:h-[400px]"
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-3d-lg backface-hidden flex flex-col items-center justify-center text-center hover-lift border border-gray-100"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <motion.div
            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl lg:text-4xl font-bold shadow-float mb-3 md:mb-4 lg:mb-6 overflow-hidden"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {member.image ? (
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full gradient-blue-purple flex items-center justify-center">
                {initials}
              </div>
            )}
          </motion.div>
          <h3 className="text-base md:text-lg lg:text-2xl font-bold text-[#0f0f0f] mb-1 md:mb-2">{member.name}</h3>
          <p className="text-sm md:text-base lg:text-lg text-[#0f0f0f]/70 font-medium">{member.role}</p>
          <p className="text-xs md:text-sm text-[#0f0f0f]/50 mt-2 md:mt-3 lg:mt-4">Click to see details</p>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-3d-lg backface-hidden bg-gradient-to-br from-[#1a237e] to-[#311b92] text-white flex flex-col justify-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-2">{member.name}</h3>
          <p className="text-xs md:text-sm font-semibold mb-2 md:mb-3 lg:mb-4 opacity-90">{member.role}</p>
          
          <div className="space-y-2 md:space-y-3 lg:space-y-4 flex-1 flex flex-col justify-center">
            <div>
              <p className="text-[0.6rem] md:text-xs font-semibold uppercase tracking-wide mb-1 md:mb-2 opacity-80">Description</p>
              <p className="text-xs md:text-sm leading-relaxed opacity-95">{member.description}</p>
            </div>

            <div>
              <p className="text-[0.6rem] md:text-xs font-semibold uppercase tracking-wide mb-1 md:mb-2 opacity-80">Contact Details</p>
              <div className="space-y-1 md:space-y-2">
                {member.phone && (
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{member.phone}</span>
                  </div>
                )}
                {member.email && (
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                )}
                {member.whatsapp && (
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <MessageCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">WhatsApp: {member.whatsapp}</span>
                  </div>
                )}
                {member.instagram && (
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Instagram className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <a 
                      href={member.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Instagram
                    </a>
                  </div>
                )}
                {member.linkedin && (
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <Linkedin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-[0.6rem] md:text-xs opacity-70 mt-2 md:mt-3 lg:mt-4 text-center">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}