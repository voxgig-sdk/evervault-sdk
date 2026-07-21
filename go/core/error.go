package core

type EvervaultError struct {
	IsEvervaultError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEvervaultError(code string, msg string, ctx *Context) *EvervaultError {
	return &EvervaultError{
		IsEvervaultError: true,
		Sdk:              "Evervault",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *EvervaultError) Error() string {
	return e.Msg
}
