'use client';

import { cn } from '@/lib/utils';
import type { PageBuilderBlockType } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SanityImage } from '../sanity-image';
import { Container } from '../ui/container';
import { Section } from '../ui/section';
import { Button } from '../ui/button';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
};

type Project = NonNullable<
  PageBuilderBlockType<'caseStudyBlock'>['projects']
>[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isOdd = index % 2 !== 0;

  return (
    <motion.article
      {...fadeUp}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="grid min-h-103.75 grid-cols-1 overflow-hidden rounded-2xl border border-border/50 shadow-sm lg:grid-cols-[3fr_4fr]"
    >
      <div
        className={cn(
          'relative aspect-16/10 lg:aspect-auto',
          isOdd && 'lg:order-last',
        )}
      >
        {project.image?.image && (
          <SanityImage image={project.image} fill className="object-cover" />
        )}
      </div>

      <div className="flex flex-col justify-center gap-6 bg-card p-8 lg:p-12">
        {project.title && (
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
            {project.title}
          </h3>
        )}

        {project.challenge && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              The Challenge
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </div>
        )}

        {!!project.decisions?.length && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Key Decisions
            </p>
            <ul className="space-y-1">
              {project.decisions.map((decision) => (
                <li key={decision} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                  <span className="text-muted-foreground">{decision}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!!project.technologies?.length && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech._key}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs font-medium"
                >
                  {tech.icon?.image && (
                    <span className="relative size-3.5 shrink-0">
                      <SanityImage
                        image={tech.icon}
                        fill
                        className="object-contain"
                      />
                    </span>
                  )}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.link?.href && (
          <Button variant="outline" asChild className="self-start">
            <Link
              href={project.link.href}
              target={project.link.openInNewTab ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              View Project
            </Link>
          </Button>
        )}
      </div>
    </motion.article>
  );
}

export function CaseStudyBlock({
  title,
  subtitle,
  projects,
}: PageBuilderBlockType<'caseStudyBlock'>) {
  if (!projects?.length) return null;

  return (
    <Section>
      <Container>
        <div>
          {(title || subtitle) && (
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              {title && (
                <h2 className="text-2xl md:text-3xl py-4 font-light tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </motion.div>
          )}

          {projects.map((project, index) => (
            <ProjectCard key={project._key} project={project} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
