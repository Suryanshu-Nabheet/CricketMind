"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export const navLinks = [
	{
		label: "Prediction Center",
		href: "/arena",
	},
	{
		label: "Fan Arena",
		href: "/arena",
	},
	{
		label: "Live Match Hub",
		href: "/arena",
	},
];


export function Header() {
	const scrolled = useScroll(10);

	return (
		<header className="sticky top-0 z-50 w-full px-4 py-4 pointer-events-none transition-all duration-300">
			<nav
				className={cn(
					"pointer-events-auto mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6",
					"border border-border/40 bg-background/45 backdrop-blur-md transition-all duration-300 ease-in-out rounded-full",
					{
						"max-w-3xl border-border bg-background/90 shadow-lg shadow-primary/5 md:h-12 md:px-4 py-1": scrolled,
					}
				)}
			>
				<a
					className="rounded-full p-2 hover:bg-muted dark:hover:bg-muted/50"
					href="/"
				>
					<Logo className="h-4" />
				</a>
				<div className="hidden items-center gap-2 md:flex">
					<div>
						{navLinks.map((link) => (
							<Button asChild key={link.label} size="sm" variant="ghost" className="rounded-full">
								<a href={link.href}>{link.label}</a>
							</Button>
						))}
					</div>
					<Button asChild size="sm" className="rounded-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground">
						<a href="/arena">Enter Arena</a>
					</Button>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}


