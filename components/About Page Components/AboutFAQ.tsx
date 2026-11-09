"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Maitri Global Education?",
    answer:
      "Maitri Global Education is an international education consultancy established in 2009. We help students explore overseas education opportunities through university selection, free education counselling, admission assistance, scholarship guidance, visa documentation and student support.",
  },
  {
    question: "Where is Maitri Global Education located?",
    answer:
      "Maitri Global Education has its headquarters in Florence, Italy, with offices in India and Dubai. Our international presence enables us to provide education counselling and practical assistance to students planning to study abroad.",
  },
  {
    question: "Which countries can I study in through Maitri Global Education?",
    answer:
      "Students can explore international education opportunities in Italy, France, Germany, Spain, Ireland, the UK, the UAE and other destinations, depending on the availability of programmes and institutional partnerships.",
  },
  {
    question:
      "Does Maitri Global Education provide free study abroad counselling?",
    answer:
      "Yes. Maitri Global Education offers free one-on-one education counselling to help students identify suitable universities, courses, destinations and admission pathways.",
  },
  {
    question: "Does Maitri help students get scholarships to study abroad?",
    answer:
      "Yes. We help students identify eligible scholarship opportunities offered by our partner institutions and provide assistance with scholarship applications. Scholarships are subject to university eligibility requirements, selection criteria and availability.",
  },
  {
    question: "Does Maitri Global Education help with university admissions?",
    answer:
      "Yes. We assist students with university and course selection, application preparation, documentation, portfolio guidance where applicable, application submissions and admission-related coordination.",
  },
  {
    question: "Does Maitri provide student visa assistance?",
    answer:
      "Yes. We provide guidance on student visa requirements, documentation checklists and application preparation for relevant study destinations. Visa decisions are made by the respective immigration authorities and embassies.",
  },
  {
    question: "Does Maitri help students find accommodation abroad?",
    answer:
      "Yes. We assist students in exploring accommodation options and provide guidance on housing arrangements and local neighbourhoods, subject to availability.",
  },
  {
    question: "Does Maitri provide airport pickup for international students?",
    answer:
      "Yes. Airport pickup and transfer arrangements are available as part of our additional student support services, subject to destination and availability.",
  },
  {
    question: "Does Maitri provide support after students arrive in Italy?",
    answer:
      "Yes. Through our presence in Florence, Italy, we assist students with practical settling-in requirements, including Codice Fiscale, Permesso di Soggiorno guidance, SIM card activation, bank account assistance and airport transfers.",
  },
  {
    question:
      "Which courses can students apply for through Maitri Global Education?",
    answer:
      "Students can explore undergraduate, postgraduate and specialised programmes in fashion, design, business, management, luxury, media, hospitality, engineering and other academic disciplines, depending on available institutional programmes.",
  },
  {
    question:
      "How can I apply to study abroad through Maitri Global Education?",
    answer:
      "Students can contact Maitri Global Education through the official website to book a free counselling session. Our counsellors will review their academic profile, discuss suitable destinations and programmes, and guide them through the next steps.",
  },
];

export default function AboutFAQ() {
  return (
    <section className="w-full bg-[#faf9f6] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* Left Content */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
              <span className="h-px w-8 bg-amber-500" />
              Need Help?
            </span>

            <h2
              style={{ fontFamily: "Epika" }}
              className="mt-5 text-3xl leading-tight font-medium text-[#101828] sm:text-4xl lg:text-5xl"
            >
              Frequently Asked
              <span className="mt-2 block bg-gold-gradient bg-clip-text text-transparent">
                Questions
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-zinc-600">
              Find answers to common questions about studying abroad with Maitri
              Global Education, our services, and the support we provide.
            </p>

            <div className="mt-8 rounded-2xl border border-amber-200/70 bg-white p-6">
              <p className="text-lg font-medium text-[#101828]">
                Still have questions?
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Our team is happy to help you understand your study abroad
                options.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-900"
              >
                Contact our team
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="w-full">
            <Accordion className="w-full space-y-3" multiple={false}>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="group overflow-hidden rounded-xl border border-zinc-200 bg-white px-5 transition-all duration-300 hover:border-amber-300/80 hover:shadow-[0_4px_20px_rgba(16,24,40,0.04)] sm:px-6"
                >
                  <AccordionTrigger className="group flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left text-sm font-semibold leading-6 text-[#101828] transition-colors duration-300 hover:no-underline hover:text-amber-700 sm:py-6 sm:text-base **:data-[slot=accordion-trigger-icon]:hidden">
                    <span className="flex min-w-0 flex-1 items-center gap-4">
                      <span className="mt-0.5 hidden shrink-0 text-xs font-semibold tabular-nums text-amber-600 sm:block">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0">{faq.question}</span>
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all duration-300 group-hover:border-amber-300 group-hover:text-amber-600 group-data-open:rotate-180 group-data-open:border-amber-300 group-data-open:bg-amber-50 group-data-open:text-amber-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="overflow-hidden pb-5 pl-0 text-sm leading-7 text-zinc-600 sm:pb-6 sm:pl-9">
                    <div className="border-l-2 border-amber-200 pl-4 sm:pl-5">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
