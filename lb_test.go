package lb

import (
	"testing"
)

func TestRunInGo(t *testing.T) {
	lb := Establish()
	lb.On("establish", func(ctx Context) {
		ctx.Response("ready")
	})
	lb.On("message", func(ctx Context) {
		ctx.Response("1234")
	})
	lb.Listen()
}
