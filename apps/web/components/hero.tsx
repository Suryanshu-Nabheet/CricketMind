import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { IconPlaceholder } from "@/components/ui/icon-placeholder";

export function HeroSection() {
	return (
		<section>
			<div className="relative flex flex-col items-center justify-center gap-5 px-4 py-12 md:px-4 md:py-24 lg:py-28">
				{/* X Faded Borders & Shades */}
				<div
					aria-hidden="true"
					className="absolute inset-0 -z-1 size-full overflow-hidden"
				>
					<div
						className={cn(
							"absolute -inset-x-20 inset-y-0 z-0 rounded-full",
							"bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.04),transparent,transparent)]",
							"blur-[50px]"
						)}
					/>
					<div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
					<div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
					<div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
					<div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
				</div>
				
				<a
					className={cn(
						"group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card p-1 shadow",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
					)}
					href="#challenge"
				>
					<div className="rounded-full border bg-primary/10 border-primary/20 px-2 py-0.5 shadow-sm text-primary">
						<p className="font-mono text-[10px] font-bold uppercase tracking-wider">APL Active</p>
					</div>

					<span className="text-xs text-muted-foreground font-medium">1st Innings Challenge 1 Live</span>
					<span className="block h-4 border-l border-border" />

					<div className="pr-1">
						<IconPlaceholder
							className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5 text-primary"
							hugeicons="ArrowRight02Icon"
							lucide="ArrowRightIcon"
							phosphor="ArrowRightIcon"
							remixicon="RiArrowRightLine"
							tabler="IconArrowRight"
						/>
					</div>
				</a>

				<h1
					className={cn(
						"max-w-3xl text-balance text-center text-3xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out"
					)}
				>
					Engage in Live Sporting Events <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">Beyond Passive Viewing</span>
				</h1>

				<p
					className={cn(
						"text-center text-muted-foreground text-sm tracking-wide sm:text-lg max-w-2xl",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out"
					)}
				>
					CricketMind creates immersive second-screen interactions during matches. 
					Participate in real-time predictions, engage with key live moments, and compete with fans.
				</p>

				<div className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
					<Button asChild variant="outline" className="rounded-full border-border bg-background hover:bg-muted text-foreground cursor-pointer">
						<a href="/arena">
							<IconPlaceholder
								data-icon="inline-start"
								hugeicons="Call02Icon"
								lucide="PhoneCallIcon"
								phosphor="PhoneCallIcon"
								remixicon="RiPhoneLine"
								tabler="IconPhone"
							/>{" "}
							View Leaderboard
						</a>
					</Button>
					<Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
						<a href="/arena">
							Enter Arena{" "}
							<IconPlaceholder
								data-icon="inline-end"
								hugeicons="ArrowRight02Icon"
								lucide="ArrowRightIcon"
								phosphor="ArrowRightIcon"
								remixicon="RiArrowRightLine"
								tabler="IconArrowRight"
							/>
						</a>
					</Button>
				</div>
			</div>
			
			<div className="relative">
				<DecorIcon className="size-4" position="top-left" />
				<DecorIcon className="size-4" position="top-right" />
				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />

				<FullWidthDivider className="-top-px" />
				
				{/* Widescreen Minimalist Light Dashboard Console */}
				<div className="overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-md max-w-5xl mx-auto my-6 shadow-xl shadow-primary/5 p-6 md:p-10 font-sans">
					{/* Console Browser Bar */}
					<div className="flex items-center justify-between border-b border-border/80 pb-5 mb-8">
						<div className="flex items-center gap-3">
							<div className="size-3 rounded-full bg-border" />
							<div className="size-3 rounded-full bg-border" />
							<div className="size-3 rounded-full bg-border" />
							<span className="text-xs font-semibold text-muted-foreground ml-3 font-mono tracking-wider select-none">console.cricketmind.live</span>
						</div>
						<div className="flex items-center gap-3">
							<span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
								<span className="size-1.5 rounded-full bg-primary" /> SECONDS-ACTIVE
							</span>
							<span className="text-xs font-semibold text-muted-foreground font-mono">LOBBY #4829</span>
						</div>
					</div>

					{/* Widescreen Columns */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
						{/* Card 1: Live Match State */}
						<div className="border border-border/60 rounded-xl p-5 bg-background shadow-xs flex flex-col justify-between min-h-[260px]">
							<div>
								<span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Match State</span>
								<h4 className="text-base font-extrabold text-foreground tracking-tight mb-1">IND vs AUS</h4>
								<p className="text-xs text-muted-foreground font-medium mb-5">1st Innings • Live Event Stream</p>
								
								<div className="space-y-3">
									<div className="flex justify-between items-center text-xs">
										<span className="text-muted-foreground font-medium">Active Overs</span>
										<span className="font-mono font-bold text-foreground">18.2 / 20</span>
									</div>
									<div className="flex justify-between items-center text-xs">
										<span className="text-muted-foreground font-medium">Current Runs</span>
										<span className="font-mono font-bold text-foreground">184 / 3</span>
									</div>
								</div>
							</div>
							
							<div className="border-t border-border/50 pt-4 text-[10px] flex justify-between text-muted-foreground font-mono">
								<span>V. Kohli: 84* (48)</span>
								<span>P. Cummins: 1/32</span>
							</div>
						</div>

						{/* Card 2: Interactive Prediction State */}
						<div className="border border-primary/20 rounded-xl p-5 bg-primary/5 shadow-xs flex flex-col justify-between min-h-[260px]">
							<div>
								<div className="flex justify-between items-center mb-4">
									<span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Prediction</span>
									<span className="size-2 rounded-full bg-primary animate-pulse" />
								</div>
								<h4 className="text-sm font-extrabold text-foreground leading-snug mb-5">
									Predict Virat Kohli's score outcome on the next delivery.
								</h4>
							</div>
							
							<div className="grid grid-cols-2 gap-2 text-xs">
								<button className="border border-border/80 bg-background hover:border-primary/50 text-foreground font-semibold py-2 px-1 rounded-lg text-center transition-all cursor-pointer">0 - 1 Runs</button>
								<button className="border border-primary bg-primary text-primary-foreground font-bold py-2 px-1 rounded-lg text-center transition-all cursor-pointer hover:bg-primary/95">Boundary</button>
								<button className="border border-border/80 bg-background hover:border-primary/50 text-foreground font-semibold py-2 px-1 rounded-lg text-center transition-all cursor-pointer">2 - 3 Runs</button>
								<button className="border border-border/80 bg-background hover:border-primary/50 text-foreground font-semibold py-2 px-1 rounded-lg text-center transition-all cursor-pointer">Wicket!</button>
							</div>
						</div>

						{/* Card 3: Minimalist Standings */}
						<div className="border border-border/60 rounded-xl p-5 bg-background shadow-xs flex flex-col justify-between min-h-[260px]">
							<div>
								<span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Fan Leaderboard</span>
								
								<div className="space-y-3.5 text-xs">
									<div className="flex justify-between items-center border-b border-border/40 pb-2">
										<span className="font-semibold text-foreground">Suryanshu Nabheet</span>
										<span className="font-mono font-bold text-primary">+250 pts</span>
									</div>
									<div className="flex justify-between items-center border-b border-border/40 pb-2">
										<span className="font-semibold text-foreground">John Doe</span>
										<span className="font-mono font-bold text-muted-foreground">+180 pts</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="font-semibold text-foreground">Alice Smith</span>
										<span className="font-mono font-bold text-muted-foreground">+0 pts</span>
									</div>
								</div>
							</div>
							
							<div className="text-center text-[9px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
								Real-Time Synchronization
							</div>
						</div>
					</div>
				</div>

				<FullWidthDivider className="-bottom-px" />
			</div>
		</section>
	);
}
