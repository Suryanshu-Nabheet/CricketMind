import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { LogoCloud } from "@/components/logo-cloud";

export function LogosSection() {
	return (
		<section className="mb-12">
			<h2 className="py-6 text-center font-semibold text-lg text-muted-foreground tracking-tight md:text-xl">
				Built with a modern <span className="text-primary font-bold">Tech Stack</span>
			</h2>
			<div className="relative *:border-0">
				<DecorIcon className="size-4" position="top-left" />
				<DecorIcon className="size-4" position="top-right" />
				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />

				<FullWidthDivider className="-top-px" />
				<LogoCloud />
				<FullWidthDivider className="-bottom-px" />
			</div>
		</section>
	);
}
