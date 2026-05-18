import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";

export function LogoCloud() {
	return (
		<div className="grid grid-cols-2 border border-border md:grid-cols-4 rounded-xl overflow-hidden shadow-xs">
			<TechCard label="Next.js" className="border-r border-b">
				<img 
					src="https://cdn.simpleicons.org/nextdotjs/0F172A" 
					alt="Next.js Logo" 
					className="h-7 w-7 select-none pointer-events-none object-contain transition-all duration-300"
				/>
				<DecorIcon className="z-10" position="bottom-right" />
			</TechCard>

			<TechCard label="shadcn/ui" className="border-b md:border-r">
				<img 
					src="https://cdn.simpleicons.org/shadcnui/0F172A" 
					alt="shadcn/ui Logo" 
					className="h-7 w-7 select-none pointer-events-none object-contain transition-all duration-300"
				/>
			</TechCard>

			<TechCard label="Turborepo" className="border-r border-b bg-card/45 md:bg-background">
				<img 
					src="https://cdn.simpleicons.org/turborepo/00A2FF" 
					alt="Turborepo Logo" 
					className="h-7 w-7 select-none pointer-events-none object-contain transition-all duration-300"
				/>
				<DecorIcon className="z-10" position="bottom-right" />
				<DecorIcon className="z-10 hidden md:block" position="bottom-left" />
			</TechCard>

			<TechCard label="TypeScript" className="border-b bg-card/65 md:bg-background">
				<img 
					src="https://cdn.simpleicons.org/typescript/3178C6" 
					alt="TypeScript Logo" 
					className="h-7 w-7 select-none pointer-events-none object-contain transition-all duration-300"
				/>
			</TechCard>

			<TechCard label="Tailwind CSS" className="border-r md:border-b-0 md:bg-background">
				<img 
					src="https://cdn.simpleicons.org/tailwindcss/06B6D4" 
					alt="Tailwind CSS Logo" 
					className="h-7 w-7 select-none pointer-events-none object-contain transition-all duration-300"
				/>
				<DecorIcon className="z-10 md:hidden" position="bottom-right" />
			</TechCard>

			<TechCard label="React 19" className="border-b bg-background md:border-r md:border-b-0 md:bg-card/45">
				<img 
					src="https://cdn.simpleicons.org/react/00A2FF" 
					alt="React Logo" 
					className="h-7 w-7 select-none pointer-events-none object-contain transition-all duration-300 animate-spin"
					style={{ animationDuration: '10s' }}
				/>
			</TechCard>

			<TechCard label="PNPM" className="border-r">
				<img 
					src="https://cdn.simpleicons.org/pnpm/f68712" 
					alt="PNPM Logo" 
					className="h-7 w-7 select-none pointer-events-none object-contain transition-all duration-300"
				/>
			</TechCard>

			<TechCard label="ESLint" className="bg-card/65">
				<img 
					src="https://cdn.simpleicons.org/eslint/4B32C3" 
					alt="ESLint Logo" 
					className="h-7 w-7 select-none pointer-events-none object-contain transition-all duration-300"
				/>
			</TechCard>
		</div>
	);
}

type TechCardProps = React.ComponentProps<"div"> & {
	label: string;
};

function TechCard({ label, className, children, ...props }: TechCardProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-3.5 bg-background px-4 py-8 md:p-8 hover:bg-muted/40 transition-all duration-300 group cursor-default select-none",
				className
			)}
			{...props}
		>
			<div className="transform group-hover:scale-110 transition-all duration-300">
				{children}
			</div>
			<span className="text-xs font-semibold text-foreground tracking-wide font-sans">{label}</span>
		</div>
	);
}
