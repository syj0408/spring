/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/9.0.26
 * Generated at: 2020-01-06 08:22:10 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.view.user;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class service_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = null;
  }

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    if (!javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      final java.lang.String _jspx_method = request.getMethod();
      if ("OPTIONS".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        return;
      }
      if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSP들은 오직 GET, POST 또는 HEAD 메소드만을 허용합니다. Jasper는 OPTIONS 메소드 또한 허용합니다.");
        return;
      }
    }

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta charset=\"UTF-8\">\r\n");
      out.write("<title>늘:솜씨</title>\r\n");
      out.write("</head>\r\n");
      out.write("<body class=\"\">\r\n");
      out.write("<div class=\"wrap\" id=\"wrap\">\r\n");
      out.write("\t\t<div class=\"container\">\r\n");
      out.write("\t\t<div class=\"service-wrap\">\r\n");
      out.write("\t\t<div class=\"service-cont\">\r\n");
      out.write("\t\t<div class=\"service-area service-area01\">\r\n");
      out.write("\t\t야근 때문에, 시간이 없어서,<br>\r\n");
      out.write("\t\t거리가 멀어서, 그냥 귀찮아서...<br><br>\r\n");
      out.write("\t\t팍팍한 삶 속 취미 한 스푼을 더해,<br>\r\n");
      out.write("\t\t여유롭고 아름다운 일상을 즐기고 싶었지만<br>\r\n");
      out.write("\t\t취미를 즐기지 못할 이유는 왜 그렇게나 많았을까요?\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div class=\"service-area service-area02\">\r\n");
      out.write("\t\t당신에게 취미를 가지지 못할<br class=\"-w\">\r\n");
      out.write("\t\t100가지 이유가 있었다면,\r\n");
      out.write("\t\t<div class=\"service-area02-tit\">\r\n");
      out.write("\t\t하비풀이 취미를 만날 수 있는<br>\r\n");
      out.write("\t\t단 하나의 이유가 되어 드릴게요.\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<!-- <div class=\"service-area02-info\">* hability는 hobby + ability의 합성어입니다.</div> -->\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div class=\"service-area service-area03\">\r\n");
      out.write("\t\t<div class=\"service-area03-txt\">\r\n");
      out.write("\t\t<span class=\"ico-circle\"></span>\r\n");
      out.write("\t\t<strong>늘:솜씨는 당신과 취미를 만나게 합니다.</strong>\r\n");
      out.write("\t\t<em>hobbyful helps you to start a hobby</em>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div class=\"service-area service-area04\">\r\n");
      out.write("\t\t<div class=\"service-area04-01\">\r\n");
      out.write("\t\t<strong>쉽고 편리한<br>취미배송 서비스</strong>\r\n");
      out.write("\t\t평소에 즐기고 싶었던 취미를 고르기만 하세요!<br>취미 클래스가 여러분의 방으로 찾아갑니다.\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div class=\"service-area04-02\">\r\n");
      out.write("\t\t<strong>상자 하나로 준비 끝<br>클래스 키트</strong>\r\n");
      out.write("\t\t하비풀의 취미 클래스 키트 속에는 재료부터 도구까지, <br>필요한 모든 것이 완벽하게 갖춰져 있답니다.\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div class=\"service-area04-03\">\r\n");
      out.write("\t\t<strong>전문가가 직접 알려주는<br>클래스 영상</strong>\r\n");
      out.write("\t\t취미 아티스트가 자세하게 과정을 설명해 드리는<br>클래스 영상으로 누구든 쉽게 취미를 시작할 수 있어요.\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div class=\"service-area service-area05\">\r\n");
      out.write("\t\t<div class=\"service-area05-txt\">\r\n");
      out.write("\t\t<span class=\"ico-circle\"></span>\r\n");
      out.write("\t\t<strong>하비풀은 취미로 아름다워질 세상을 기대합니다.</strong>\r\n");
      out.write("\t\t<em>hobbyful wishes more beautiful world through hobby</em>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div class=\"service-area service-area06\">\r\n");
      out.write("\t\t<div class=\"service-area06-tit\">\r\n");
      out.write("\t\t하비풀의 클래스 키트는<br>\r\n");
      out.write("\t\t어르신들의 손길을 거쳐 여러분에게 전달됩니다.\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t하비풀은 도움이 필요한 어르신들에게<br>\r\n");
      out.write("\t\t좋은 일자리를 드리려는 사회적 미션을 품고 있습니다.<br><br>\r\n");
      out.write("\t\t취미가 만드는 아름다운 세상을 위해<br>\r\n");
      out.write("\t\t하비풀이 내딛는 첫 걸음을 지켜봐 주세요.\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div class=\"service-area service-area07\">\r\n");
      out.write("\t\t<div class=\"service-area07-tit\">\r\n");
      out.write("\t\t<span class=\"ico-circle\"></span>\r\n");
      out.write("\t\t하비풀과 만나요!\r\n");
      out.write("\t\t<em>contact us</em>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<ul class=\"service-area07-list\">\r\n");
      out.write("\t\t<li>\r\n");
      out.write("\t\t<strong>일반 및 제휴 문의</strong>\r\n");
      out.write("\t\t<p>contact@hobbyful.co.kr</p>\r\n");
      out.write("\t\t<hr>\r\n");
      out.write("\t\t</li>\r\n");
      out.write("\t\t<li>\r\n");
      out.write("\t\t<strong>고객 문의</strong>\r\n");
      out.write("\t\t<p>help@hobbyful.co.kr</p>\r\n");
      out.write("\t\t</li>\r\n");
      out.write("\t\t</ul>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<script>\r\n");
      out.write("\t\twindow.fbAsyncInit = function() {\r\n");
      out.write("\t\tFB.init({\r\n");
      out.write("\t\tappId      : '388145468250973',\r\n");
      out.write("\t\txfbml      : true,\r\n");
      out.write("\t\tversion    : 'v3.2'\r\n");
      out.write("\t\t});\r\n");
      out.write("\t\tFB.AppEvents.logPageView();\r\n");
      out.write("\t\t};\r\n");
      out.write("\t\t(function(d, s, id){\r\n");
      out.write("\t\tvar js, fjs = d.getElementsByTagName(s)[0];\r\n");
      out.write("\t\tif (d.getElementById(id)) {return;}\r\n");
      out.write("\t\tjs = d.createElement(s); js.id = id;\r\n");
      out.write("\t\tjs.src = \"https://connect.facebook.net/en_US/sdk.js\";\r\n");
      out.write("\t\tfjs.parentNode.insertBefore(js, fjs);\r\n");
      out.write("\t\t}(document, 'script', 'facebook-jssdk'));\r\n");
      out.write("\t</script>\r\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}