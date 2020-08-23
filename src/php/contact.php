<div class="container-fluid" id="contact">
    <div class="container">
        <div class="row">
            <div class="col sectionHeader">
                <h1>Contact</h1>
                <h3>Get ahold of me.</h3>
            </div>
        </div>

<!--        Contact Form-->
        <section class="mb-4 ">
            <div class="row">
                <div class="col-md-9 mb-md-0 mb-5">
                    <form id="contact-form" name="contact-form" action="php/mail.php" method="POST">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="md-form form-label-group">
                                    <input type="text" id="name" name="name" class="form-control-plaintext" placeholder="Your name">
                                    <label for="name">Your name</label>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="md-form form-label-group">
                                    <input type="text" id="email" name="email" class="form-control-plaintext" placeholder="Your email">
                                    <label for="email">Your email</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="md-form form-group form-label-group">
                                    <input type="text" id="subject" name="subject" class="form-control-plaintext" placeholder="Subject">
                                    <label for="subject">Subject</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="md-form form-label-group">
                                    <textarea type="text" id="message" name="message" rows="4" class="rounded-0 form-control-plaintext" placeholder="Your message"></textarea>
                                    <label for="message">Your message</label>
                                </div>
                            </div>
                        </div>

                        <!--
                        <div class="row">
                            <div class="col-md-3">
                                <div class="md-form form-group form-label-group">
                                    <input type="text" id="captcha" name="captcha" class="form-control-plaintext" placeholder="">
                                    <label for="captcha"></label>
                                </div>
                            </div>
                        </div>
                        -->
                    </form>

                    <div class="text-center text-md-left">
                        <?php //<button class="btn rounded-0 btn-primary" onclick="validateForm()">Send</button> ?>
                        <button class="btn rounded-0 btn-primary g-recaptcha" data-sitekey="6LdIRsIZAAAAABSiIOVYIdvRrNHE80K_-F_gP5-9" data-callback='onSubmit' data-action='submit'>Send</button>
                    </div>
                    <div class="text-muted text-size" style="font-size: 10px">
                        This site is protected by reCAPTCHA and the Google
                       <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                       <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                   </div>
                    <div id="status"></div>
                </div>

                <!--Side Information-->
                <div class="col-md-3 text-center">
                    <ul class="list-unstyled mb-0">
                        <li>
                            <i id="iconLarge" class="material-icons">location_on</i>
                            <p>Davis, CA 95616, USA</p>
                        </li>
                        <li class="mt-lg-3 mt-md-2">
                            <i id="iconLarge" class="material-icons iconLarge">phone</i>
                            <p>1.208.446.4435</p>
                        </li>
                        <li class="mt-lg-3 mt-md-2">
                            <i id="iconLarge" class="material-icons iconLarge">email</i>
                            <p>contact@noahtarr.com</p>
                        </li>
                        <li class="mt-lg-3 mt-md-2">
                            <i id="iconLarge" class="material-icons iconLarge">account_box</i>
                            <p>Peek at my <a href="/../resume.pdf" target="_blank">Resume</a></p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

    </div>
</div>