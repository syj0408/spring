<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>��й�ȣ ����</title>
<script type="text/javascript">
	function inchk(f) {
		if (f.pass.value == "") {
			alert("���� ��й�ȣ�� �Է��ϼ���");
			f.pass.focus();
			return false;
		}
		if (f.chgpass.value == "") {
			alert("���� ��й�ȣ�� �Է��ϼ���");
			f.chgpass.focus();
			return false;
		}
		if (f.chgpass.value != f.chgpass2.value) {
			alert("���� ��й�ȣ �� ���� ��й�ȣ ���Է��� �ٸ��ϴ�.");
			f.chgpass2.value = "";
			f.chgpass2.focus();
			return false;
		}
		return true;
	}
</script>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/main.css">
</head>
<body>
	<form action="password.shop" method="post" name="f"
		onsubmit="return inchk(this)">
		<table>
			<caption>��й�ȣ ����</caption>
			<tr>
				<th>���� ��й�ȣ</th>
				<td><input type="password" name="pass"></td>
			</tr>
			<tr>
				<th>���� ��й�ȣ</th>
				<td><input type="password" name="chgpass"></td>
			</tr>
			<tr>
				<th>���� ��й�ȣ ���Է�</th>
				<td><input type="password" name="chgpass2"></td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="��й�ȣ ����"></td>
			</tr>
		</table>
	</form>
</body>
</html>