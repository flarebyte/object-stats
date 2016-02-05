import test from "tape"
import objectStats from "../src"

test("objectStats", (t) => {
  t.plan(1)
  t.equal(true, objectStats(), "return true")
})
