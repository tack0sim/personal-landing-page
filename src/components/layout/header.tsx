import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
    return (
        <header>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Talha Minhas</h2>
                    <nav>
                        <ul className="flex gap-4">
                            <li><a href="#about">About</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                    <Link href="#contact">
                        <Button variant="accent">Contact</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}