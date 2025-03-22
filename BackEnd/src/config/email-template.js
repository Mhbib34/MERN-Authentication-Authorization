export const welcomeEmailTemplate = (email, name) => {
  return `<td align="left" esd-img-prev-src class="esd-structure es-p40t es-p40b es-p20r es-p20l">
  <table width="100%" cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td width="560" valign="top" align="center" class="esd-container-frame">
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="left" class="esd-block-text es-p20b">
                  <h1 class="es-m-txt-c" style="text-align:center">
                    WELCOME ${name}
                  </h1>
                </td>
              </tr>
              <tr>
                <td align="left" class="esd-block-text">
                  <h3 class="es-m-txt-c" style="color:rgb(106, 163, 139);text-align:center">
                    Welcome to our website,Your account has been created with email id: ${email} .
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</td>`;
};

export const otpEmailTemplate = (name, otp, text) => {
  return `<td bgcolor="#fafafa" align="center" class="esd-stripe" style="background-color:rgb(250, 250, 250)">
  <table esd-img-prev-src width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" style="background-color:rgb(255, 255, 255)">
    <tbody>
      <tr>
        <td esd-img-prev-src="https://fkus.stripocdn.email/content/guids/CABINET_8a8240f4650bd716d3cd69675fe184ca/images/1041555765740937.png" esd-img-prev-position="left top" esd-img-prev-repeat="no-repeat" bgcolor="transparent" align="left" class="esd-structure es-p40t es-p20r es-p20l" style="background-color:transparent;background-position:left top">
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width="560" valign="top" align="center" class="esd-container-frame">
                  <table esd-img-prev-src esd-img-prev-position="left top" width="100%" cellspacing="0" cellpadding="0" style="background-position:left top">
                    <tbody>
                      <tr>
                        <td align="center" class="esd-block-image es-p5t es-p5b" style="font-size:0">
                          <a target="_blank">
                            <img src="https://fukeyzv.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png" alt="" width="175" style="display:block">
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="esd-block-text es-p15t es-p15b">
                          <h1 style="color:#333333;font-size:20px">
                            <strong>YOUR </strong>
                          </h1>
                          <h1 style="color:#333333;font-size:20px">
                            <strong>&nbsp;OTP</strong>
                          </h1> 
                        </td>
                      </tr>
                      <tr>
                        <td align="left" class="esd-block-text es-p40r es-p40l">
                          <p style="text-align:center">
                            HI,&nbsp;${name}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" class="esd-block-text es-p35r es-p40l">
                          <p style="text-align:center">
                            There was a request to ${text}!
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="esd-block-text es-p25t es-p40r es-p40l">
                          <p>
                            If did not make this request, just ignore this email. Otherwise, here your OTP code:
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="esd-block-button es-p40t es-p40b es-p10r es-p10l">
                          <span class="es-button-border">
                            ${otp}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</td>`;
};
