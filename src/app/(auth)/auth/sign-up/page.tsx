import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center p-6">
      <Card>
        <CardHeader>
          <CardTitle>Регистрация бренда</CardTitle>
          <CardDescription>
            Создайте кабинет бренда, чтобы приглашать сотрудников и креаторов.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          Здесь будет форма: название бренда, email, пароль, (опц.) логотип/категории.
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/auth/sign-in">Войти</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Продолжить в демо</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

