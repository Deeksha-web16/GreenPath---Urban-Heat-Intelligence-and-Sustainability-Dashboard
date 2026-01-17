
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Goal,
  Handshake,
  TreePine,
  Wind,
  ShieldCheck,
  Route,
  Leaf,
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          About GreenPath
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your guide to sustainable living and climate action.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Goal className="h-6 w-6 text-primary" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            At GreenPath, our mission is to empower individuals to take
            meaningful climate action. We believe that collective small changes
            can lead to significant environmental impact. By providing

            data-driven insights into urban heat and personalized
            sustainability recommendations, we aim to make sustainable living
            accessible and achievable for everyone.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            Our Values
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <TreePine className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Nature & Forests</h4>
              <p className="text-sm text-muted-foreground">
                To represent nature and forests.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Wind className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Cooling & Natural Elements</h4>
              <p className="text-sm text-muted-foreground">
                To evoke a sense of cooling and natural elements.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Protection & Safety</h4>
              <p className="text-sm text-muted-foreground">
                To represent protection and safety from heat risks.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Route className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">A Path Forward</h4>
              <p className="text-sm text-muted-foreground">
                To symbolize a path forward.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Growth & Sustainability</h4>
              <p className="text-sm text-muted-foreground">
                Symbolizing growth from a single leaf to a whole tree.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Who We Are
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none dark:prose-invert">
            <p>
              We are a passionate team of environmentalists, developers, and
              data scientists dedicated to building tools that foster a better
              relationship between cities and the environment. We are committed
              to leveraging technology to address one of the most pressing
              issues of our time: climate change.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="h-6 w-6 text-primary" />
              Join Our Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none dark:prose-invert">
            <p>
              We are always looking for feedback and collaborators. Whether you
              have ideas for new features, want to contribute to our project,
              or simply want to share your sustainability story, we'd love to
              hear from you. Together, we can pave a greener path for future
              generations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
