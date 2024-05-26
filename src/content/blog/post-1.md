---
title: An Introduction
excerpt: Welcome! My name is Stephen Collins. I am a Software Architect who took the bold decision to attempt to build a brand-new product from the ground up, by myself, in my spare time. The result was UnAd, a direct-to-consumer SMS relay system targeted at small business.
publishDate: 'May 26 2024'
tags:
  - UnAd
  - Black Box
seo:
  image:
    src: '/post-1-flare.webp'
    alt: Software Black Box
isFeatured: true
---

![Software Black Box](/post-1-flare.webp)

Welcome!  My name is Stephen Collins.  I am a Software Architect who took the bold decision to attempt to build a brand-new product from the ground up, by myself, in my spare time.  The result was [UnAd](https://theunad.com), a direct-to-consumer SMS relay system targeted at small business.

This blog is intended to be--as well as a creative outlet--a resource for other developers to learn from my mistakes.

## A Little About Me

At time of writing, I've been building software for a total of 26 years.  I got started around 8 years old on a [Tandy 1000RL](https://en.wikipedia.org/wiki/Tandy_1000), where I initially learned [GW-BASIC](https://en.wikipedia.org/wiki/GW-BASIC), writing such innovative programs as...

```basic
10 PRINT "Stephen is great!"
20 GOTO 10
```

...but quickly moved on to [VB4](https://en.wikipedia.org/wiki/Visual_Basic_(classic)), and spent countless nights and weekends trying to build the next big POS system.  Yes, I was that kind of nerd.

Jump forward almost 20 years and I've now built multiple startups from the ground up.  Some have failed, some are still operating to this day.

But enough about me.  Let's get into the real meat of this matter: the tech.

## UnAd's Early Days

The idea for this platform stemmed from a fairly simple premise:  I wanted to know where a food truck I had previously been to was located.

Now of course, this problem has been solved a million ways in the past.  "Food Truck Apps" are a dime a dozen; some are even the basis of countless "learn technology *x*" blogs and videos.  But my approach was different.  I wanted to build the simplest, most bare-bones system that would allow one simple thing:  A street vendor to tell their customers where they are.  

The solve for that?  SMS.

That was 3 years ago.

---
## Fleshing Out the Idea

At the time I initially embarked on this journey, I was just finishing a $100k+ project I had built from scratch with only myself, a designer, and a junior developer.  It was running smoothly, and it was the perfect time to pick up something new.  That project was using "multi-cloud" approach, hosting things in a myriad of places such as [Redis Labs](https://redis.io/), [Azure](https://azure.microsoft.com/), and [Mongo Atlas](https://www.mongodb.com/products/platform/atlas-database).  It was a fun project to build; I had complete creative control, and could build anything just the way I wanted.  I'm still proud of it to this day.

Taking inspiration from that project, as well as a [failed project](https://www.sec.gov/litigation/litreleases/lr-25825) I moved on to later, I had a good starting point.  My basic approach boiled down to this:

![30000ft view](/30000ft-old.svg)

Nothing too crazy; a [Next.js](https://nextjs.org/) site to handle webhooks from from Twilio and Stripe, as well as a frontend to allow users to sign up, all of which would be managed by a Redis database.  The design was a simple as, *I thought*, the system would be.  And in all honesty, had things gone the way they could have, it would have stopped there.  But my mistake, as I soon found out, was the decision to use Next.js to begin with.

## The First Pain Points

Don't get me wrong.  Next is a solid technology.  In fact, it still runs the [Signup Site](https://signup.unad.tech/).  My failure in the decision to use it was not knowing it's limitations.

For instance, one of the first critical feature I wanted to ensure was available from day one was Internationalization in both English and Spanish.  I live in a city with a very large Latinx population, and wanted to make sure that the experience of using my system was just as easy for both native English and Spanish speakers.  So, to that end, I employed, initially, [next-i18next](https://github.com/i18next/next-i18next).

For strictly front-end translation, this tool works like a charm.  The setup process is a bit clumsy, but it's approach to providing the translation function as a simple `t()` function returned from a [hook](https://react.dev/reference/react/hooks) is intuitive and easy to use.  But then there's server-side translations, which, after **weeks** of fighting, proved to be, at the time, basically impossible.

The key point about that, though, is that the lack server-side translation was not a limitation of it's underlying library, [i18next](https://www.i18next.com/), (no relation to Next.js, btw) but rather how Next.js, as you go deeper and need more customization, becomes more and more *hostile* to these changes.

## The Black Box Problem

*Let's go back in time a bit...*

My very first "real" job as a developer was in 2006.  I had just completed a course in "Game Programming" from a now-defunct community college, and had been placed as an intern at a [airfoil](https://en.wikipedia.org/wiki/Components_of_jet_engines) manufacturing plant.  My charge was to, piece by piece, begin the process of replacing a series of applications written in a mix of [FoxPro](https://en.wikipedia.org/wiki/FoxPro) and VB6 with new versions written in the new-fangled .NET Framework.  Which, as luck would have it, I had already been learning on the side during my course at the college.

I remember distinctly the very first interview question.  The head of IT sat me down at his desk, opened an ASP.NET project, and asked me, "Where is the entry point of this application."  I dutifully opened the `Gloabal.aspx.cs` file, navigated to `Application_Start`, and said triumphantly, "Right here!"

In retrospect, this should have been the end of my answer.  But, as my wife would gladly attest to, I rarely just leave it at that.

So instead, I launched into a 10-minute rant about how, "But also, not really, because that function is really just a special function that ASP.NET itself looks for when the DLL is loaded by IIS," followed by a impassioned speech about the limitations introduced by this "black box" approach to a web server.  Anyone who had tried "real" Dependency Injection in ASP.NET prior to the release of [OWIN](https://learn.microsoft.com/en-us/aspnet/aspnet/overview/owin-and-katana/getting-started-with-owin-and-katana) knows exactly what I'm talking about.

*Back to the present day...*

But apparently I never learned my lesson, because there I was, over 15 years later, beating my head against another black box.

If you ask Vercel, the impetus behind this approach is a "streamlined developer experience," which is technically true, but, as with most similar things, that streamlining has its costs, which in the case of the `next-i18next` package, means that there's *nowhere* to hook into the startup of the server to initialize the required components for server-side translation.  There are some incredibly kludgy work-arounds, but nothing that felt robust enough for my tastes.  So after another week of trail-and-error with various alternatives, I finally settled on [next-intl](https://next-intl-docs.vercel.app/).  It utilizes a very similar paradigm with a translation function returned from a hook, provides decent tooling support with its use of TypeScript, and can be used on the backend with its `intlCreateTranslator` function, which, when wrapped in a nice convenience function, allows a nice one-liner in API Routes.

```ts
// i18n.ts
export async function createTranslator(
  req: NextApiRequest | IncomingMessage,
  namespace: string,
  defaultLocale: string = DefaultLocale
) {
  const locale = getRequestLocale(req) ?? defaultLocale;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return intlCreateTranslator({
    locale,
    messages,
    namespace,
  });
}
// pages/api/otp.ts
const t = await createTranslator(req, 'pages/api/otp');
```

## Finding a Balance

Could I have simply written an Express or ASP.NET app from scratch and avoided all this?  Yes.  But, to Vercel's point, a "streamlined developer experience" and "increased time-to-market" is *exactly what I was looking for*.

And therein lies the problem.  In the same way that convenience and security are often polar opposites, it seems so is convenience and control.  In reaching for the "quick" solution, I sacrificed the power I would have otherwise to produce the software I wanted to deliver.

## Moving Forward

Taking this as a lesson, *every single project* in the UnAd system, even the simplest utilities, would be written with tools that hide as little as possible from the developer.  In situations where abstraction is inherently high, I would only go with tools that provided extension points to modify the behavior of those abstractions.  Admittedly, this decision absolutely increased the development time significantly, but at the time time, significantly decreased my levels of stress during development, because the limitations became, in almost all cases, limitations of my own knowledge rather than that of the tools.

Turns out, I can learn much faster than I can have a PR approved.
