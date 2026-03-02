const SignInComponent = React.memo((props) => {
  const [showSuccessMessage, _] = useNotification();
  const [showPassword, setShowPassword] = useState(false);

  const initForm = {
    username: "",
    password: "",
    isRememberMe: storage.getRememberMe(),
  };

  const validationForm = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmitForm = async (
    values,
    { setFieldValue, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await props.login(values.username, values.password, values.isRememberMe);
    } catch (error) {
      if (error.message === MESSAGE.LOGIN_WRONG_USERNAME_OR_PASSWORD) {
        setStatus({ success: false });
        setErrors({ login: error.message });
        setSubmitting(false);
        setFieldValue("password", "", false);
      } else if (error.message === MESSAGE.LOGIN_BLOCKED_ACCOUNT) {
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ login: error.message });
      } else {
        console.log(error);
      }
    }
  };

  const ButtonWithLoading = WithLoading(Button);

  return (
    <>
      <Card>
        <Card.Body>
          <div className="m-sm-3">
            <Formik
              initialValues={initForm}
              validationSchema={validationForm}
              onSubmit={handleSubmitForm}
            >
              {({
                errors,
                setFieldError,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                setSubmitting,
                touched,
                values,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="required">Tên đăng nhập</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={values.username}
                      isInvalid={Boolean(touched.username && errors.username)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {!!touched.username && (
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label className="required">Mật khẩu</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        size="lg"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        isInvalid={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span
                        className="password-toggle-icon ms-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {!!touched.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    )}
                    <small>
                      <Link to="/auth/reset-password">Quên mật khẩu?</Link>
                    </small>
                  </Form.Group>

                  <div>
                    <Form.Check
                      type="checkbox"
                      id="isRememberMe"
                      label="Remember me"
                      defaultChecked={values.isRememberMe}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-center mt-3">
                    <ButtonWithLoading
                      isLoading={isSubmitting}
                      type="submit"
                      variant="primary"
                      size="lg"
                    >
                      Đăng nhập
                    </ButtonWithLoading>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </>
  );
});
