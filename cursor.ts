import { encode } from "./deps.ts";

const isTerminalApp = Deno.env("TERM_PROGRAM") === "Apple_Terminal";

const ESC = "\u001B[";

const SAVE = isTerminalApp ? "\u001B7" : ESC + "s";
const RESTORE = isTerminalApp ? "\u001B8" : ESC + "u";
const POSITION = "6n";
const HIDE = "?25l";
const SHOW = "?25h";
const SCROLL_UP = "T";
const SCROLL_DOWN = "S";

const UP = "A";
const DOWN = "B";
const RIGHT = "C";
const LEFT = "D";

const CLEAR_RIGHT = "0K";
const CLEAR_LEFT = "1K";
const CLEAR_LINE = "2K";

const CLEAR_DOWN = "0J";
const CLEAR_UP = "1J";
const CLEAR_SCREEN = "2J";
const CLEAR = "\u001Bc";

const NEXT_LINE = "1E";
const PREV_LINE = "1F";
const COLUMN = "1G"; // left?
const HOME = "H";

export async function write(str: string) {
  await Deno.stdout.write(encode(str));
}

export async function cursor(action: string): Promise<void> {
  await write(ESC + action);
}

async function save(): Promise<void> {
  await write(SAVE);
}

async function restore(): Promise<void> {
  await write(RESTORE);
}

async function position(): Promise<void> {
  await cursor(POSITION);
}

async function hideCursor(): Promise<void> {
  await cursor(HIDE);
}

async function showCursor(): Promise<void> {
  await cursor(SHOW);
}

async function scrollUp(): Promise<void> {
  await cursor(SCROLL_UP);
}

async function scrollDown(): Promise<void> {
  await cursor(SCROLL_DOWN);
}

async function clearUp(): Promise<void> {
  await cursor(CLEAR_UP);
}

async function clearDown(): Promise<void> {
  await cursor(CLEAR_DOWN);
}

async function clearLeft(): Promise<void> {
  await cursor(CLEAR_LEFT);
}

async function clearRight(): Promise<void> {
  await cursor(CLEAR_RIGHT);
}

async function clearLine(): Promise<void> {
  await cursor(CLEAR_LINE);
}

async function clearScreen(): Promise<void> {
  await cursor(CLEAR_SCREEN);
}

async function nextLine(): Promise<void> {
  await cursor(NEXT_LINE);
}

async function prevLine(): Promise<void> {
  await cursor(PREV_LINE);
}

async function goHome(): Promise<void> {
  await cursor(HOME);
}

async function goUp(y = 1): Promise<void> {
  await cursor(y + UP);
}

async function goDown(y = 1): Promise<void> {
  await cursor(y + DOWN);
}

async function goLeft(x = 1): Promise<void> {
  await cursor(x + LEFT);
}

async function goRight(x = 1): Promise<void> {
  await cursor(x + RIGHT);
}

async function goTo(x: number, y: number): Promise<void> {
  await write(ESC + y + ";" + x + HOME);
}

export {
  CLEAR,
  CLEAR_DOWN,
  CLEAR_LEFT,
  CLEAR_LINE,
  CLEAR_RIGHT,
  CLEAR_SCREEN,
  CLEAR_UP,
  COLUMN,
  DOWN,
  HIDE,
  HOME,
  LEFT,
  NEXT_LINE,
  POSITION,
  PREV_LINE,
  RESTORE,
  RIGHT,
  SAVE,
  SCROLL_DOWN,
  SCROLL_UP,
  SHOW,
  UP,
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
  goTo
};
