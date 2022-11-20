package lb

import (
	"encoding/json"
	"fmt"
	"testing"
)

type EstablishOptions struct {
	AppName string `json:"APP_NAME"`
}

func TestRunInGo(t *testing.T) {
	lb := Establish()
	lb.On("establish", func(ctx Context) {
		options := &EstablishOptions{}
		json.Unmarshal([]byte(ctx.Data), options)
		fmt.Println("ctx.Data", options.AppName == "midway/lb")
		ctx.Response("ready")
	})
	lb.On("message", func(ctx Context) {
		ctx.Response("1234")
	})
	lb.Listen()
}
