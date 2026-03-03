import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center p-6">
      <Card>
        <CardHeader>
          <CardTitle>Вход</CardTitle>
          <CardDescription>Войти в кабинет бренда или как креатор по приглашению.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          Здесь будет форма входа или вход по ссылке-приглашению.
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/auth/sign-up">Регистрация</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Продолжить в демо</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

