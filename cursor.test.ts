import { assertEquals } from "./dev-deps.ts";
import { decode } from "./deps.ts";
import {
  write,
  cursor,
  save,
  restore,
  position,
  hideCursor,
  showCursor,
  scrollUp,
  scrollDown,
  clearUp,
  clearDown,
  clearLeft,
  clearRight,
  clearLine,
  clearScreen,
  nextLine,
  prevLine,
  goHome,
  goUp,
  goDown,
  goLeft,
  goRight,
  goTo,
  SAVE,
  RESTORE
} from "./cursor.ts";

function spy(obj: any, prop: any): any {
  const savedTarget = obj[prop];
  let calls: any[] = [];

  const spy = (...args: any[]) => {
    calls.push(args);
  };

  const restoreSpy = () => {
    obj[prop] = savedTarget;
  };

  obj[prop] = spy;

  return { calls, restoreSpy };
}

function test(
  title: string,
  testFn: (calls: any[]) => Promise<void>
) {
  Deno.test(title, async () => {
    const { calls, restoreSpy } = spy(Deno.stdout, "write");
    await testFn(calls);
    restoreSpy();
  });
}

test("write", async calls => {
  await write("foo");
  assertEquals(decode(calls[0][0]), "foo");
});

test("cursor", async calls => {
  await cursor("1E");
  assertEquals(decode(calls[0][0]), "\u001B[1E");
});

test("save", async calls => {
  await save();
  assertEquals(decode(calls[0][0]), SAVE);
});

test("restore", async calls => {
  await restore();
  assertEquals(decode(calls[0][0]), RESTORE);
});

test("position", async calls => {
  await position();
  assertEquals(decode(calls[0][0]), "\u001B[6n");
});

test("hideCursor", async calls => {
  await hideCursor();
  assertEquals(decode(calls[0][0]), "\u001B[?25l");
});

test("showCursor", async calls => {
  await showCursor();
  assertEquals(decode(calls[0][0]), "\u001B[?25h");
});

test("scrollUp", async calls => {
  await scrollUp();
  assertEquals(decode(calls[0][0]), "\u001B[T");
});

test("scrollDown", async calls => {
  await scrollDown();
  assertEquals(decode(calls[0][0]), "\u001B[S");
});

test("clearUp", async calls => {
  await clearUp();
  assertEquals(decode(calls[0][0]), "\u001B[1J");
});

test("clearDown", async calls => {
  await clearDown();
  assertEquals(decode(calls[0][0]), "\u001B[0J");
});

test("clearLeft", async calls => {
  await clearLeft();
  assertEquals(decode(calls[0][0]), "\u001B[1K");
});

test("clearRight", async calls => {
  await clearRight();
  assertEquals(decode(calls[0][0]), "\u001B[0K");
});

test("clearLine", async calls => {
  await clearLine();
  assertEquals(decode(calls[0][0]), "\u001B[2K");
});

test("clearScreen", async calls => {
  await clearScreen();
  assertEquals(decode(calls[0][0]), "\u001B[2J");
});

test("nextLine", async calls => {
  await nextLine();
  assertEquals(decode(calls[0][0]), "\u001B[1E");
});

test("prevLine", async calls => {
  await prevLine();
  assertEquals(decode(calls[0][0]), "\u001B[1F");
});

test("goHome", async calls => {
  await goHome();
  assertEquals(decode(calls[0][0]), "\u001B[H");
});

test("goUp", async calls => {
  await goUp();
  assertEquals(decode(calls[0][0]), "\u001B[1A");
});

test("goDown", async calls => {
  await goDown();
  assertEquals(decode(calls[0][0]), "\u001B[1B");
});

test("goLeft", async calls => {
  await goLeft();
  assertEquals(decode(calls[0][0]), "\u001B[1D");
});

test("goRight", async calls => {
  await goRight();
  assertEquals(decode(calls[0][0]), "\u001B[1C");
});

test("goUp(n)", async calls => {
  await goUp(2);
  assertEquals(decode(calls[0][0]), "\u001B[2A");
});

test("goDown(n)", async calls => {
  await goDown(2);
  assertEquals(decode(calls[0][0]), "\u001B[2B");
});

test("goLeft(n)", async calls => {
  await goLeft(2);
  assertEquals(decode(calls[0][0]), "\u001B[2D");
});

test("goRight(n)", async calls => {
  await goRight(2);
  assertEquals(decode(calls[0][0]), "\u001B[2C");
});

test("goTos", async calls => {
  await goTo(10, 100);
  assertEquals(decode(calls[0][0]), "\u001B[100;10H");
});
