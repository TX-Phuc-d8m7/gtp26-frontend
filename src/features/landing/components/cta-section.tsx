import { Button } from "@mui/material";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-orange-50 via-white to-green-50">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-foreground">
            Ready to Transform Your Eating Habits?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of users discovering meals that make them feel amazing. Start chatting with your personal food health coach today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chat">
            <Button
              variant="contained"
              size="large"
              className="!bg-orange-600 hover:!bg-orange-700 !text-white !px-8 !py-3 !text-lg !w-full sm:!w-auto"
            >
              Get Started Free
            </Button>
          </Link>
          <Button
            variant="outlined"
            size="large"
            className="!border-orange-600 !text-orange-600 hover:!bg-orange-50 !px-8 !py-3 !text-lg !w-full sm:!w-auto"
          >
            View Examples
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required. Start getting personalized meal suggestions instantly.
        </p>
      </div>
    </section>
  );
}
